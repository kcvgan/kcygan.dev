---
title: My take on concise promise handling in TypeScript.
date: "2019-04-21"
My solution for ugly promise callback hell and async/await try-catch madness.
tags: typescript, promise, cleancode
---
After looking for a clean way to handle async/await REST calls without try-catch blocks, I found a small wrapper that satisfied my needs. 

The article that inspired me was https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/. 

```javascript
function on (promise) {
    return promise
      .then(response => [response, null)
      .catch(error => [null, error])
}

/// async function
async function doSomething() {
    const [data, error] = await on(somePromise())
    if (data) {
        // do whatever
    } else {
        // handle error
    }
}

```

The above solution was like an eureka moment after I did started with stuff like this:
```javascript
promise
    .then(result => doSomething(result))
    .catch(error => log(error))
```
and this:
```javascript
    try {
        const data = await somePromise()
        // do whatever
    } catch (e) {
        // handle error
    }
```
After doing lots of work on the frontend with React and learning hooks, the simplicity of the solution outlined in the article just clicked. I happily started using testing the solution and it looked and worked beautifully. During code review however, a colleague pointed out that however nice, it's not typed at all. He then suggested to actually write it the TypeScript way (i.e. typed, duh).

Here it is: 

```typescript
// using Axios but you can type ypour promises however you'd like
const on = <RES, ERR = any> (promise: AxiosPromise): Promise<[RES | null, ERR | null]> => {
  return promise
    // destructuring since my API returns all the good stuff like so.
    .then(({ data }): [RES, ERR | null] => [data, null])
    .catch((error): [RES | null, ERR] => [null, error])
}

// and now calling it from an async function
const [todo, error] = await on<Todo>(somePromise())
// now my returned todo is already typed as Todo.
// error typing is optional, it defaults to any.
```

I'm posting my solution just to share my point of view. I'm very open to improvements and comments. Would you use such a solution? Let me know. This is also my first article/post. Since I've always wanted to write about stuff I do, I decided such a short topic might be just enough to get my feet wet.

Cheers!
<!--stackedit_data:
eyJoaXN0b3J5IjpbNTgzMzg2MjczXX0=
-->
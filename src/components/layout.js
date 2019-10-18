import React from "react"
import { Link } from "gatsby"

import { rhythm, scale } from "../utils/typography"

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `#FF491F`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: `Montserrat, sans-serif`,
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: `none`,
              textDecoration: `none`,
              color: `#FF491F`,
            }}
            to={`/`}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: `auto`,
          marginRight: `auto`,
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <header>{header}</header>
        <main>{children}</main>
        <footer>
          <Link style={{ color: `#FF491F` }} to={`/books`}>
            What I'm reading
          </Link>
          {` | `}
          <a style={{ color: `#FF491F` }} href="https://www.github.com/kcvgan">
            GitHub
          </a>
          {` | `}
          <a style={{ color: `#FF491F` }} href="mailto:kcygan54@gmail.com">
            Email
          </a>
          {` | `}
          <a
            style={{ color: `#FF491F` }}
            href="https://www.linkedin.com/in/kacper-cygan-6a7645153"
          >
            LinkedIn
          </a>
        </footer>
      </div>
    )
  }
}

export default Layout

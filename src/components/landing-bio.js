import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import styled from "@emotion/styled"
import avatar from "./../images/gatsby-icon.png"

const Container = styled.div`
  text-align: center;
`
const StyledLink = styled.a`
  text-decoration: none;
  position: relative;

  background-image: linear-gradient(
    rgba(255, 250, 150, 0.8),
    rgba(255, 250, 150, 0.8)
  );
  background-repeat: no-repeat;
  background-size: 100% 0.2em;
  background-position: 0 88%;
  transition: background-size 0.25s ease-in;
  &:hover {
    background-size: 100% 88%;
  }
`

const OuterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  height: 78vh;
`

const Description = styled.p`
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1.4rem;
`

const NameHeader = styled.h1`
  font-size: 3.5rem;
  margin-bottom: 0;
`

const LandingBio = () => (
  <StaticQuery
    query={graphql`
      query LandingSiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={data => (
      <OuterContainer>
        <Container>
          <img
            style={{ height: "150px", width: "150px", borderRadius: "100%" }}
            src={avatar}
            alt="A portrait of me."
          />
          <NameHeader>kacper cygan</NameHeader>
          <Description>frontend dev</Description>
          <Description>
            👋
            <StyledLink href="mailto:hello@kcygan.dev">
              {" "}
              hello@kcygan.dev{" "}
            </StyledLink>
          </Description>
        </Container>
      </OuterContainer>
    )}
  />
)

NameHeader.propTypes = {
  siteTitle: PropTypes.string,
  subtitle: PropTypes.string,
}

NameHeader.defaultProps = {
  siteTitle: ``,
  subtitle: ``,
}

export default LandingBio

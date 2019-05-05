import { NextFC, NextContext } from "next"
import React, { Fragment } from "react"
import { Global, css, keyframes } from "@emotion/core"
import { tablet as tabletBreakpoint } from "../style-helpers/breakpoints"
import styled from "@emotion/styled"
import Link from 'next/link'

const blink = keyframes`
    from, to{ opacity: 1}
    50% { opacity: 0}
`
const Blink = styled.span`
  color: white;
  background: white;
  display: inline-block;
  width: 6px;
  height: 10px;
  animation: ${blink};
  animation-iteration-count: infinite;
  animation-timing-function: step-end;
  animation-duration: 1.5s;
  margin-bottom: -2px;
`

const pageStyles = css`
  body {
    background: blue;
    color: #ffffff;
    font-family: courier;
    font-size: 12px;
    text-align: center;
    margin-top: 100px;
  }

  blink {
    color: yellow;
  }

  .neg {
    background: #fff;
    color: #0000aa;
    padding: 2px 8px;
    font-weight: bold;
  }

  p,
  ul {
    margin: 30px;
    text-align: left;

    ${tabletBreakpoint} {
      margin: 30px 100px;
    }
  }

  ul {
    padding-left: 14px;
  }

  a,
  a:hover {
    color: inherit;
    font: inherit;
  }

  .menu {
    text-align: center;
    margin-top: 50px;
  }
`

const ErrorPage: NextFC = props => {
  return (
    <Fragment>
      <Global styles={pageStyles} />
      <span className="neg">ERROR 404</span>
      <p>
        The page is missing or never was written. You can wait and see if it becomes available again, or you can restart
        your computer.
      </p>
      <ul>
        <li>Send us an e-mail to notify this and try it later.</li>
        <li>
          Press CTRL+ALT+DEL to restart your computer. You will lose unsaved information in any programs that are
          running.
        </li>
      </ul>
      Press any link to continue <Blink />
      <div className="menu">
        | <Link as="/" route="/"><a>Home</a></Link> | <a href="#">Webmaster</a> |
      </div>
    </Fragment>
  )
}

ErrorPage.getInitialProps = ({ res, err }: NextContext) => {
  let statusCode = null
  if (res && res.statusCode) {
    statusCode = res.statusCode
  }
  return { statusCode }
}

export default ErrorPage

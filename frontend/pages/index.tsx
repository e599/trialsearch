/**@jsx jsx */
import { Input } from "antd"
import styled from "@emotion/styled"
import { jsx } from "@emotion/core"
import Router from "next/router"
import * as breakpoints from "../style-helpers/breakpoints"
import { Logo } from "../components/Logo"

import { useSpring, animated, config } from "react-spring"

// animation: ${fadeInAnimation} 1000ms ease;
const Container = styled(animated.div)`
  width: 100%;
  text-align: center;
  position: absolute;
  padding: 12px;
  top: 30%;
  transform-origin: "top left";

  ${breakpoints.phone} {
    padding: 24px;
  }
  ${breakpoints.tablet} {
    width: 580px;
    left: calc((100% - 580px) / 2);
  }
`

export default function Index() {
  const styles = useSpring({
    from: { opacity: 0, transform: "translateY(150px)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: config.stiff,
  })

  return (
    <Container style={styles}>
      <Logo />
      <p>Your place to find up to date information on clinical trials</p>
      <Input.Search
        onSearch={value => {
          if (!value) return
          Router.push({ pathname: "/search", query: { search_term: value } })
        }}
        placeholder="search for clinical trials"
        enterButton
        autoFocus
      />
    </Container>
  )
}

import React from "react"
import { Centered } from "./StyledComponents"
import { Empty } from "antd"

export const EmptyState = () => (
  <Centered>
    <Empty description="We could not find any results." />
    <p>Please try again</p>
  </Centered>
)

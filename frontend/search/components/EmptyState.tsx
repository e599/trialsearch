/**@jsx jsx */
import { css, jsx } from "@emotion/core"
import { Centered } from "./StyledComponents"
import { Icon } from "antd"

export const EmptyState = () => (
  <Centered>
    <Icon
      css={css`
        font-size: 100px;
        font-weight: 100;
        margin-bottom: 32px;
      `}
      type="file-unknown"
    />
    <p>We could not find any search results</p>
    <p>Please try again!</p>
  </Centered>
)

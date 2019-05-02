import React, { Fragment } from "react"
import styled from "@emotion/styled"
import { Card } from "./StyledComponents"
import { Skeleton } from "antd"

type SkeletonResultsProps = { size: number }

const SkeletonCard = styled(Skeleton)`
  .ant-skeleton-title {
    height: 20px;
    width: 100%;
    margin-bottom: 30px;
  }

  .ant-skeleton-paragraph {
    padding: 0;

    & > li {
      margin: 12px 0 !important;
    }
  }
`

const NCTSkeleton = styled(Skeleton)`
  .ant-skeleton-content {
    height: 12px;
  }

  .ant-skeleton-paragraph {
    margin: 0;
    padding: 0;

    & > li {
      height: 13px;
    }
  }
`
export const SkeletonResults: React.FC<SkeletonResultsProps> = ({ size }) => (
  <Fragment>
    {Array(size)
      .fill(0)
      .map((_, i) => (
        <Card key={i}>
          <NCTSkeleton active title={false} paragraph={{ rows: 1, width: [95] }} />
          <SkeletonCard active title={{ width: "85%" }} paragraph={{ rows: 3, width: "100%" }} />
        </Card>
      ))}
  </Fragment>
)

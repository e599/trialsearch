import React, { Fragment } from "react"
import ContentLoader from "react-content-loader"
import { Card } from "./StyledComponents"

type SkeletonProps = { width: number; height: number }
export const Skeleton: React.FC<SkeletonProps> = ({ width, height = 100 }) => {
  return (
    <ContentLoader width={width} height={height}>
      <rect x="0" y="2" rx="4" ry="4" width="300" height="13" />
      <rect x="0" y="30" rx="3" ry="3" width="250" height="10" />
      <rect x="0" y="60" rx="3" ry="3" width="250" height="10" />
      <rect x="320" y="0" rx="4" ry="4" width="78" height="32" />
    </ContentLoader>
  )
}

type SkeletonResultsProps = { size: number }
export const SkeletonResults: React.FC<SkeletonResultsProps> = ({ size }) => (
  <Fragment>
    {Array(size)
      .fill(0)
      .map((_, i) => (
        <Card key={i}>
          <Skeleton width={500} height={100} />
        </Card>
      ))}
  </Fragment>
)

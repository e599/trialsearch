import { Fragment } from "react"
import { css } from "@emotion/core"
import styled from "@emotion/styled"

export const Container = styled.div`
  padding: 20px 30px;
  z-index: 1;
  background: white;
  box-shadow: 1px 10px 20px -1px rgba(224, 224, 224, 1);
`

export const Label = styled.span`
  margin: 16px 0;
  flex: 0 0 160px;
`

export const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Text = styled.span`
  text-transform: capitalize;
`

export const fullWidth = css`
  flex: 1;
`

export const SearchResultsPanel = styled.div`
  overflow: hidden scroll;
  grid-area: results;
  min-width: 400px;
`

export const Card = styled.div`
  padding: 32px;
  height: 232px;
  border-bottom: 1px solid #e7e7e7;
`

export const TrialCard = styled.div`
  padding: 32px;
  border-bottom: 1px solid #e7e7e7;
  letter-spacing: 0.3px;

  &:hover {
    cursor: pointer;
    background: #f9f9f9;

    & > .title {
      color: #4f96d8;
    }
  }

  & > .title {
    margin-bottom: 24px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: bold;
  }

  & .nct-id {
    font-size: 12px;
    line-height: 12px;
    text-decoration: underline;

    & > a:visited {
      color: purple;
    }
  }

  & > .summary {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

export const Centered = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

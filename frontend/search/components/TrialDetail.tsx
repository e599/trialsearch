/**@jsx jsx */
import React, { Suspense, useState, Fragment } from "react"
import { css, jsx } from "@emotion/core"
import { ListClinicalTrial } from "../../api/wireModels"
import { HalfPageDetail } from "../components/StyledComponents"
import { useTransition } from "react-spring"
import { Skeleton, Divider, Icon } from "antd"
import { SubSection } from "./StyledComponents"
import { RecruitingDetails } from "./RecruitingDetails"
import { Intervention } from "./Intervention"

type TrialDetailProps = {
  currentTrial: ListClinicalTrial
}

export const TrialDetail: React.FC<TrialDetailProps & { onClose: () => void }> = ({ currentTrial, onClose }) => {
  const [open, setOpen] = useState(true)

  const transitions = useTransition(open, null, {
    from: { left: "100%" },
    enter: { left: "0%" },
    leave: { left: "100%" },
    config: { tension: 270, friction: 30 },
    onDestroyed: () => onClose(),
  })

  return (
    <React.Fragment>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <HalfPageDetail key={key} style={props}>
              <Icon
                type="close"
                onClick={() => setOpen(false)}
                css={css`
                  width: 16px;
                  height: 16px;
                  & > svg {
                    width: 16px;
                    height: 16px;
                  }
                  float: right;
                  &:hover {
                    cursor: pointer;
                  }
                `}
              />
              <h1>{currentTrial.brief_title}</h1>

              <Suspense
                fallback={
                  <Skeleton
                    active
                    title={false}
                    paragraph={{ rows: 3, width: [270, 320, "100%"] }}
                    css={css`
                      .ant-skeleton-paragraph {
                        padding: 0;
                      }
                    `}
                  />
                }
              >
                <Intervention newId={currentTrial.new_id} />
              </Suspense>

              <Divider />

              <h3>Summary</h3>
              <p
                css={css`
                  margin-bottom: 32px;
                `}
              >
                {currentTrial.brief_summary}
              </p>

              <Suspense
                fallback={
                  <Fragment>
                    <SubSection>
                      <Skeleton
                        active
                        title={false}
                        paragraph={{ rows: 5, width: [250, 196, 216, 204, 180] }}
                        css={css`
                          .ant-skeleton-paragraph {
                            padding: 0;
                          }
                        `}
                      />
                    </SubSection>
                    <SubSection>
                      <Skeleton
                        active
                        paragraph={{ rows: 6 }}
                        title={{ width: 135 }}
                        css={css`
                          .ant-skeleton-title {
                            height: 24px;
                          }
                          .ant-skeleton-paragraph {
                            padding: 0;
                          }
                        `}
                      />
                    </SubSection>
                  </Fragment>
                }
              >
                <RecruitingDetails newId={currentTrial.new_id} onSuggestTabClick={() => setOpen(false)} />
              </Suspense>
            </HalfPageDetail>
          ),
      )}
    </React.Fragment>
  )
}

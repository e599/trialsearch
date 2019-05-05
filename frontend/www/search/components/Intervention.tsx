/**@jsx jsx */
import React, { Fragment } from "react"
import { css, jsx } from "@emotion/core"
import { singleTrialResource, singleTrialCache } from "../../api/trialsResource"

type TrialId = {
  newId: string
}

export const Intervention: React.FC<TrialId> = props => {
  const trialResource = singleTrialResource.read(singleTrialCache, props.newId)

  return (
    <Fragment>
      {trialResource.interventions && (
        <h4>
          Intervention:{" "}
          {trialResource.interventions.map(intervention => intervention.intervention_name).join(", ") || "Unknown"}
        </h4>
      )}
      <section
        css={css`
          display: flex;
          & > h4 {
            margin-right: 48px;
          }
        `}
      >
        {trialResource.phase && (
          <h4>
            Phase: <span>{trialResource.phase}</span>
          </h4>
        )}

        {trialResource.overall_status && (
          <h4>
            Status: <span>{trialResource.overall_status}</span>
          </h4>
        )}
      </section>

      {trialResource.mesh_terms && (
        <h4>Mesh Terms: {trialResource.mesh_terms.map(meshTerm => meshTerm.mesh_term).join(", ") || "N/A"}</h4>
      )}
    </Fragment>
  )
}

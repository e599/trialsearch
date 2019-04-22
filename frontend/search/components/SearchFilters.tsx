/** @jsx jsx */
import { useContext } from "react"
import { Select, Radio } from "antd"
import { head } from "ramda"
import { jsx } from "@emotion/core"

import { SearchFiltersContext } from "./SearchFiltersContext"
import { Container, Label, Section, Text, fullWidth } from "./StyledComponents"

import { AgeRange, InterventionType, Phase, Sex, Status } from "../../api/wireModels"

export const SearchFiltersPanel: React.FC = () => {
  const filters = useContext(SearchFiltersContext)
  const { status: activeEnrollment, sex, age_range: age, phase, intervention_type: interventions } = filters.get()

  return (
    <Container>
      <h2>Search Filters</h2>

      <Section>
        <Label>Active Enrollment</Label>
        <Select
          allowClear
          mode="multiple"
          css={fullWidth}
          placeholder="Select One"
          value={activeEnrollment}
          onChange={value => filters.put({ status: value })}
        >
          {Object.values(Status).map(status => (
            <Select.Option key={status} value={status}>
              <Text>{status.replace(/_/g, " ")}</Text>
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Age Range</Label>
        <Select
          allowClear
          css={fullWidth}
          placeholder="Select One"
          mode="multiple"
          value={age}
          onChange={value => filters.put({ age_range: value })}
        >
          {Object.values(AgeRange).map(ageRange => (
            <Select.Option key={ageRange} value={ageRange}>
              <Text>{ageRange.replace(/_/g, " ")}</Text>
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Gender</Label>
        <Radio.Group
          value={head(sex || [])}
          css={fullWidth}
          onChange={({ target: { value: sex } }) => filters.put({ sex: sex ? [sex] : [] })}
        >
          <Radio value={undefined}>All</Radio>
          <Radio value={Sex.Male}>Male</Radio>
          <Radio value={Sex.Female}>Female</Radio>
        </Radio.Group>
      </Section>

      <Section>
        <Label>Phase</Label>
        <Select
          allowClear
          css={fullWidth}
          placeholder="Select One"
          mode="multiple"
          value={phase}
          onChange={value => filters.put({ phase: value })}
        >
          {Object.values(Phase).map(phase => (
            <Select.Option key={phase} value={phase}>
              <Text>{phase.replace(/_/g, " ")}</Text>
            </Select.Option>
          ))}
        </Select>
      </Section>

      <Section>
        <Label>Intervention</Label>
        <Select
          allowClear
          css={fullWidth}
          placeholder="Select One"
          mode="multiple"
          value={interventions}
          onChange={interventions => filters.put({ intervention_type: interventions })}
        >
          {Object.values(InterventionType).map(interventionType => (
            <Select.Option key={interventionType} value={interventionType}>
              <Text>{interventionType.replace(/_/g, " ")}</Text>
            </Select.Option>
          ))}
        </Select>
      </Section>
    </Container>
  )
}

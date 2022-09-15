import { FiChevronRight } from 'react-icons/fi'

import { Container, Step } from './styles'

export interface Step {
  name: string
  active?: boolean
  selected?: boolean
  id?: number
}

export interface StepConfig {
  name: string
}

export interface Props {
  steps: Step[]
}

const active = (step: number, stepSelected: number) => {
  return step <= stepSelected
}

const getStep = (name: string, step: number, stepSelected: number) => {
  return {
    active: active(step, stepSelected),
    name: name,
    selected: step === stepSelected,
    id: step
  }
}

export const getStepList: (steps: StepConfig[], selected: number) => Step[] = (
  steps,
  selected
) => {
  const list: Step[] = []
  let index = 0
  for (const step of steps) {
    list.push(getStep(step.name, index, selected))
    index++
  }
  return list
}

export const getSelected: (steps: Step[]) => Step = steps => {
  return steps.find(data => data.selected)
}

export const Stepper: React.FC<Props> = ({ steps }) => {
  return (
    <Container>
      <ul className="progressBar">
        {steps.map((step, index) => (
          <Step
            selected={step.selected}
            count={steps.length}
            key={index}
            active={step.active}
          >
            <div>
              {step.selected && <FiChevronRight size={20}></FiChevronRight>}
              <span>{step.name}</span>
            </div>
          </Step>
        ))}
      </ul>
    </Container>
  )
}

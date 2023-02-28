import { FiChevronRight } from 'react-icons/fi'

import { Container, Step } from './styles'

export interface Step {
  name: string
  active?: boolean
  selected?: boolean
  id?: number
}

export interface Props {
  steps: Step[]
  current: number
}

export const Stepper: React.FC<Props> = ({ steps, current }) => {
  return (
    <Container>
      <ul className="progressBar">
        {steps.map((step, index) => (
          <Step
            selected={step.id === current}
            count={steps.length}
            key={index}
            active={step.id <= current}
          >
            <div>
              {step.id === current && <FiChevronRight size={20} />}
              <span>{step.name}</span>
            </div>
          </Step>
        ))}
      </ul>
    </Container>
  )
}

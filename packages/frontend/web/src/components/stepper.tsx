import { FiChevronRight } from 'react-icons/fi'

import { Container, Step } from '../styles/components/stepper'

export interface Step {
  name: string
  active?: boolean
  selected?: boolean
  id: string
}

export interface Props {
  steps: Step[]
}

const Stepper: React.FC<Props> = ({ steps }) => {
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

export default Stepper

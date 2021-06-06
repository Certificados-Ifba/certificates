import { useRouter } from 'next/router'
import { useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown, FiPlusCircle } from 'react-icons/fi'

import {
  Container,
  Padding,
  Header,
  Content
} from '../styles/components/accordion'

export interface AccordionProps {
  open?: boolean
  title?: string
  icon?: React.ComponentType<IconBaseProps>
}

const Accordion: React.FC<AccordionProps> = ({
  children,
  open = false,
  title,
  icon: Icon
}) => {
  const [accordionOpen, setAccordionOpen] = useState(open)
  return (
    <Padding>
      <Container>
        <Header
          onClick={() => {
            setAccordionOpen(!accordionOpen)
          }}
          open={accordionOpen}
        >
          {Icon && (
            <div>
              <Icon size={20} />
            </div>
          )}
          <h2>{title}</h2>
          <div>
            <FiChevronDown size={20}></FiChevronDown>
          </div>
        </Header>
        {accordionOpen && <Content>{children}</Content>}
      </Container>
    </Padding>
  )
}

export default Accordion

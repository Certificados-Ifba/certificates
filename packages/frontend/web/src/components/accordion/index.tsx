import { AccordionProps, InternalAccordion } from './accordion'
import { Section, Footer } from './styles'

interface AccordionComponent
  extends React.FC<AccordionProps & React.RefAttributes<HTMLDivElement>> {
  Section: typeof Section
  Footer: typeof Footer
}

const Accordion = InternalAccordion as AccordionComponent

Accordion.Section = Section
Accordion.Footer = Footer

export { Accordion }

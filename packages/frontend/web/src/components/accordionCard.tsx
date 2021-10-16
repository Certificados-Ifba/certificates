import { ReactElement, useCallback, useState } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

import { Container } from '../styles/components/accordionCard'
import Button from './button'

interface Props {
  info: ReactElement
}

const AccordionCard: React.FC<Props> = ({ info, children }) => {
  const [show, setShow] = useState(false)

  const handleToggleShow = useCallback(() => setShow(show => !show), [])

  return (
    <Container showInfo={show}>
      <div>
        {info}
        <Button
          inline
          ghost
          square
          color="info"
          size="small"
          onClick={handleToggleShow}
          type="button"
        >
          {show ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}
        </Button>
      </div>
      {show && children}
    </Container>
  )
}

export default AccordionCard

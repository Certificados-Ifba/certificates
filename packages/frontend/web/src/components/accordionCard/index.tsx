import { Button } from '@components'
import { ReactElement, useCallback, useState } from 'react'
import { FiChevronUp, FiChevronDown } from 'react-icons/fi'

import { Container } from './styles'

interface Props {
  info: ReactElement
}

export const AccordionCard: React.FC<Props> = ({ info, children }) => {
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

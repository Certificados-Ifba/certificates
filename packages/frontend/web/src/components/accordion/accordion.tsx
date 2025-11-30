import { useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown } from 'react-icons/fi'

import { Container, Header, Content } from './styles'

interface Props {
  title?: string
  icon?: React.ComponentType<IconBaseProps>
  isOpen?: boolean
  onToggle?: (state: boolean) => void
}
export type { Props as AccordionProps }

export const InternalAccordion: React.FC<Props> = ({
  children,
  isOpen: isOpenState,
  title,
  icon: Icon,
  onToggle
}) => {
  const [isOpen, setIsOpen] = useState(!!isOpenState)

  const handleToggle = useCallback(() => {
    if (onToggle) onToggle(!isOpen)
    if (isOpenState === undefined) setIsOpen(isOpen => !isOpen)
  }, [isOpen, isOpenState, onToggle])

  useEffect(() => {
    if (isOpenState !== undefined) setIsOpen(!!isOpenState)
  }, [isOpen, isOpenState])

  return (
    <Container>
      <Header open={isOpen} onClick={handleToggle}>
        {Icon && (
          <div>
            <Icon size={20} />
          </div>
        )}
        <h2>{title}</h2>
        <div>
          <FiChevronDown size={20} />
        </div>
      </Header>
      <Content open={isOpen}>{children}</Content>
    </Container>
  )
}

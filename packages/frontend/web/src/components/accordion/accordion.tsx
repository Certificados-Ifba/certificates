import { ComponentType, useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown } from 'react-icons/fi'

import { Container, Header, Content } from './styles'

interface Props {
  title?: string
  icon?: ComponentType<IconBaseProps>
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
  const StyledContainer = Container as ComponentType<any>
  const StyledHeader = Header as ComponentType<any>
  const StyledContent = Content as ComponentType<any>

  const handleToggle = useCallback(() => {
    if (onToggle) onToggle(!isOpen)
    if (isOpenState === undefined) setIsOpen(isOpen => !isOpen)
  }, [isOpen, isOpenState, onToggle])

  useEffect(() => {
    if (isOpenState !== undefined) setIsOpen(!!isOpenState)
  }, [isOpen, isOpenState])

  return (
    <StyledContainer>
      <StyledHeader open={isOpen} onClick={handleToggle}>
        {Icon && (
          <div>
            <Icon size={20} />
          </div>
        )}
        <h2>{title}</h2>
        <div>
          <FiChevronDown size={20} />
        </div>
      </StyledHeader>
      <StyledContent open={isOpen}>{children}</StyledContent>
    </StyledContainer>
  )
}

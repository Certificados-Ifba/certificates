import { ReactNode, useState } from 'react'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { ButtonProps } from '../styles/components/button'
import { Container, DropdownContent } from '../styles/components/dropdown'
import Button from './button'

export interface DropdownProps extends ButtonProps {
  dropdownChildren: ReactNode
  dropdownColor?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning'
    | 'dark'
    | 'medium'
    | 'light'
  onChangeState?: ({ active: boolean }) => void
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  dropdownChildren,
  onChangeState,
  ...rest
}) => {
  const { type, ...restButton } = rest
  const [active, setActive] = useState(false)
  return (
    <Container active={active}>
      <Button
        onClick={() => {
          setActive(!active)
          if (onChangeState) onChangeState({ active: active })
        }}
        type="button"
        {...restButton}
      >
        {!active && <FiChevronDown size={20} />}{' '}
        {active && <FiChevronUp size={20} />} <span>{children}</span>
      </Button>
      <DropdownContent>{dropdownChildren}</DropdownContent>
    </Container>
  )
}

export default Dropdown

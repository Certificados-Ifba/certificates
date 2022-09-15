import { Button, ButtonProps } from '@components'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { Container, DropdownContent } from './styles'

interface Props extends ButtonProps {
  dropdownChildren: ReactNode
  icon?: React.ComponentType<IconBaseProps>
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
  active: boolean
  setActive: Dispatch<SetStateAction<boolean>>
}

export type { Props as DropdownProps }

export const Dropdown: React.FC<Props> = ({ ...rest }) => {
  const {
    type,
    icon: Icon,
    active,
    setActive,
    children,
    dropdownChildren,
    onChangeState,
    ...restButton
  } = rest

  const handleEvt = useCallback(
    event => {
      let dropClick = false
      if (event?.path instanceof Array) {
        for (const path of event.path) {
          try {
            for (const evtClass of path.classList) {
              if (evtClass === 'dropdown') {
                dropClick = true
                break
              }
            }
          } catch (e) {}

          if (dropClick) break
        }
      }
      if (!dropClick) {
        if (active) {
          setActive(false)
          if (onChangeState) onChangeState({ active: false })
        }
      }
    },
    [active, onChangeState, setActive]
  )

  useEffect(() => {
    window.addEventListener('click', handleEvt, true)
    return () => {
      window.removeEventListener('click', handleEvt, true)
    }
  }, [handleEvt])

  return (
    <Container className="dropdown" active={active}>
      <Button
        onClick={() => {
          setActive(!active)
          if (onChangeState) onChangeState({ active: !active })
        }}
        type="button"
        {...restButton}
      >
        {Icon && (
          <>
            <Icon size={20} />
          </>
        )}
        <span>{children}</span>
        <span style={{ marginLeft: '0.5rem' }}>
          {active && <FiChevronUp size={20} />}
          {!active && <FiChevronDown size={20} />}
        </span>
      </Button>
      <DropdownContent className="dropdown-content">
        {dropdownChildren}
      </DropdownContent>
    </Container>
  )
}

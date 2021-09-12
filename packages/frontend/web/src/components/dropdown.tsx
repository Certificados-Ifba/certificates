import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'

import { ButtonProps } from '../styles/components/button'
import { Container, DropdownContent } from '../styles/components/dropdown'
import Button from './button'

export interface DropdownProps extends ButtonProps {
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
  active?: boolean
  setActive?: Dispatch<SetStateAction<boolean>>
}

const Dropdown: React.FC<DropdownProps> = ({ ...rest }) => {
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

  const [dropActive, setDropActive] = useState(false)

  const handleSetActive = useCallback(
    (active: boolean) => {
      if (setActive) {
        setActive(active)
      } else {
        setDropActive(active)
      }
    },
    [setActive]
  )

  const isActive = () => {
    return setActive ? active : dropActive
  }

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
      if (!dropClick) handleSetActive(false)
    },
    [handleSetActive]
  )

  useEffect(() => {
    window.addEventListener('click', handleEvt, true)
    return () => {
      window.removeEventListener('click', handleEvt, true)
    }
  }, [handleEvt])

  return (
    <Container className="dropdown" active={isActive()}>
      <Button
        onClick={() => {
          handleSetActive(!isActive())
          if (onChangeState) onChangeState({ active: isActive() })
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
          {isActive() && <FiChevronUp size={20} />}
          {!isActive() && <FiChevronDown size={20} />}
        </span>
      </Button>
      <DropdownContent className="dropdown-content">
        {dropdownChildren}
      </DropdownContent>
    </Container>
  )
}

export default Dropdown

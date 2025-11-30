import { Container } from './styles'

interface Props {
  color?:
    | 'primary'
    | 'secondary'
    | 'danger'
    | 'info'
    | 'success'
    | 'warning'
    | 'dark'
    | 'medium'
    | 'light'
  size?: 'sm' | 'md' | 'lg'
  variant?: 'subtle' | 'solid' | 'outline'
}
export type { Props as TagProps }

export const Tag: React.FC<Props> = ({
  color,
  size = 'md',
  variant = 'subtle',
  children
}) => {
  return (
    <Container color={color} size={size} variant={variant}>
      {children}
    </Container>
  )
}

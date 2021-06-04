import { ButtonProps, Container } from '../styles/components/button'
import theme from '../styles/theme'
import Spinner from './spinner'

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => {
  return (
    <Container {...rest}>
      {loading ? (
        <>
          <Spinner size={20} color={theme.colors.light} />
          <span>Carregando</span>
        </>
      ) : (
        children
      )}
    </Container>
  )
}

export default Button

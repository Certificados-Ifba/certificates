import { ButtonProps as Props, Container } from '../styles/components/button'
import theme from '../styles/theme'
import Spinner from './spinner'

const Button: React.FC<Props> = ({ children, loading, ...rest }) => {
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

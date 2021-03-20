import { ButtonProps, Container } from '../styles/components/Button'

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
  return (
    <Container {...rest}>
      {rest.loading ? <span>Carregando...</span> : children}
    </Container>
  )
}

export default Button

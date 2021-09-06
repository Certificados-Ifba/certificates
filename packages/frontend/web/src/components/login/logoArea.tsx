import { FiCheck } from 'react-icons/fi'

import Logo from '../../assets/logo-full.svg'
import { Container } from '../../styles/components/login/logoArea'

const LogoArea: React.FC = () => {
  return (
    <Container>
      <Logo />
      <div className="text">Até agora foram</div>
      <h2>
        <FiCheck /> <span>37 eventos publicados</span>
      </h2>
      <h2>
        <FiCheck />
        <span>1.685 participantes cadastrados</span>
      </h2>
      <h2>
        <FiCheck />
        <span>4.400 certificados emitidos</span>
      </h2>
    </Container>
  )
}

export default LogoArea

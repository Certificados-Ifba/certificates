import { LogoFull } from '@assets'
import { FiCheck } from 'react-icons/fi'

import { Container } from './styles'

export const LogoArea: React.FC = () => {
  return (
    <Container>
      <LogoFull />
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

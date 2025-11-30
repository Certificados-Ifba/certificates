import { LogoFull } from '@assets'
import { CountUp } from '@components/countUp'
import { ResumeContext } from '@providers'
import { useContext } from 'react'
import { FiCheck } from 'react-icons/fi'

import { Container } from './styles'

export const LogoArea: React.FC = () => {
  const { events, participants, certificates } = useContext(ResumeContext)

  return (
    <Container>
      <LogoFull />
      <div className="text">Até agora foram</div>
      <h2>
        <FiCheck />
        <span>
          <CountUp end={events} /> eventos publicados
        </span>
      </h2>
      <h2>
        <FiCheck />
        <span>
          <CountUp end={participants} /> participantes cadastrados
        </span>
      </h2>
      <h2>
        <FiCheck />
        <span>
          <CountUp end={certificates} /> certificados emitidos
        </span>
      </h2>
    </Container>
  )
}

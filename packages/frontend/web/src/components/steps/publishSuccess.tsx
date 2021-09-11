import Image from 'next/image'

import { Row } from '../../styles/components/grid'
import {
  Container,
  ImageContainer
} from '../../styles/components/steps/publishSuccess'
import Alert from '../alert'

const PublishSuccess: React.FC = () => {
  return (
    <Container>
      <Row cols={2}>
        <ImageContainer>
          <Image src="/success.svg" width="" height=""></Image>
        </ImageContainer>
        <div>
          <h1>Tudo Pronto!</h1>
          <h2 style={{ marginBottom: '10px' }}>O seu evento foi publicado.</h2>
          <Alert>
            Os participantes já podem efetuar o download dos certificados.
          </Alert>
        </div>
      </Row>
    </Container>
  )
}

export default PublishSuccess

import { Container, Header, Import } from '@components'
import { withAuth } from '@hocs'
import { getParticipantSchema } from '@utils'
import Head from 'next/head'
import { FiFilePlus } from 'react-icons/fi'

import { data, examples } from './constants'

const ImportParticipants: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Participantes | Certificados</title>
      </Head>
      <Header
        title="Importar Participantes"
        subtitle="Envie uma planilha para realizar o cadastro dos participantes"
        icon={FiFilePlus}
      />
      <Import
        url="participants"
        filename="importar-participante"
        schema={getParticipantSchema()}
        dataSheet={data}
        examples={examples}
      />
    </Container>
  )
}

export default withAuth(ImportParticipants)

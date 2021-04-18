import Head from 'next/head'
import { FiSettings, FiBriefcase, FiFileText } from 'react-icons/fi'

import Generic from '../components/generic'
import Tab from '../components/tab'
import withAuth from '../hocs/withAuth'
import { Container } from '../styles/pages/home'

const Settings: React.FC = () => {
  return (
    <Container>
      <Head>
        <title>Configurações | Certificados</title>
      </Head>
      <header>
        <div>
          <h1>
            <FiSettings size={24} /> Configurações
          </h1>
          <h2>
            Defina as funções dos participantes, atividades de um evento e etc.
          </h2>
        </div>
      </header>
      <Tab
        tabs={[
          {
            name: 'Funções',
            icon: FiBriefcase,
            children: (
              <Generic name="Função" plural="Funções" url="/functions" />
            )
          },
          {
            name: 'Atividades',
            icon: FiFileText,
            children: (
              <Generic name="Atividade" plural="Atividades" url="/activities" />
            )
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(Settings)

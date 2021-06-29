import Head from 'next/head'
import { FiSettings, FiBriefcase, FiFileText } from 'react-icons/fi'

import Tab from '../components/tab'
import Generic from '../components/tabs/generic'
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
            Defina as funções dos participantes, tipo de atividade de um evento
            e etc.
          </h2>
        </div>
      </header>
      <Tab
        tabs={[
          {
            name: 'Funções',
            icon: FiBriefcase,
            children: (
              <Generic
                icon={FiBriefcase}
                name="Função"
                plural="Funções"
                url="/functions"
              />
            )
          },
          {
            name: 'Tipo de Atividades',
            icon: FiFileText,
            children: (
              <Generic
                icon={FiFileText}
                name="Tipo de Atividade"
                plural="Tipo de Atividades"
                url="/activities"
              />
            )
          }
        ]}
      />
    </Container>
  )
}

export default withAuth(Settings)

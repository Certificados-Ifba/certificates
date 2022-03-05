import {
  Alert,
  Button,
  Card,
  CardIcon,
  Container,
  Dropdown,
  Grid,
  Header,
  Input,
  Select
} from '@components'
import { IUser } from '@dtos'
import { withAuth } from '@hocs'
import { useAuth } from '@providers'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiAward,
  FiDownload,
  FiEdit,
  FiFileText,
  FiHome,
  FiInfo,
  FiPlusCircle,
  FiSearch,
  FiSend,
  FiTool,
  FiUsers
} from 'react-icons/fi'

const Home: React.FC = () => {
  const [user, setUser] = useState<IUser>()
  const { user: userAuth } = useAuth()
  const [filters, setFilters] = useState(null)
  const router = useRouter()

  const [event, setEvent] = useState({
    participants: 15,
    certificates: 30,
    download: 15,
    activities: 5,
    id: '60e8fbac290fc4003284701c',
    name: 'Evento 1'
  })

  useEffect(() => {
    if (!user) {
      setUser(userAuth)
    }
  }, [user, userAuth])

  const firstName = user?.name.split(' ')[0]

  const formRef = useRef<FormHandles>(null)
  formRef.current?.setData({ event: '1' })

  const request = null

  const handleFilter = useCallback(
    data => {
      !data.search && delete data.search
      request.resetPage()
      setFilters(data)
    },
    [request]
  )

  const [dropActive, setDropActive] = useState(false)

  return (
    <Container>
      <Head>
        <title>Página Inicial | Certificados</title>
      </Head>
      <Header
        title="Página Inicial"
        subtitle={
          <>
            Seja bem vindo, <b>{firstName}</b>
          </>
        }
        icon={FiHome}
        controls={
          <Form
            style={{ display: 'flex' }}
            ref={formRef}
            onSubmit={() => {
              console.log()
            }}
          >
            <div>
              <Dropdown
                icon={FiTool}
                setActive={setDropActive}
                active={dropActive}
                ghost
                size="small"
                color="secondary"
                dropdownChildren={
                  <>
                    <Button
                      style={{ marginBottom: '10px' }}
                      ghost
                      color="secondary"
                      size="small"
                      type="button"
                      onClick={() => {
                        router.push(`/events/info/${event?.id}`)
                      }}
                    >
                      <FiEdit size={20} />
                      <span>Editar Evento</span>
                    </Button>

                    <Button
                      style={{ marginBottom: '10px' }}
                      ghost
                      color="info"
                      size="small"
                      type="button"
                      onClick={() => {
                        router.push(`/events/certificates/${event?.id}`)
                      }}
                    >
                      <FiFileText size={20} />
                      <span>Configurar Modelos de Certificado</span>
                    </Button>
                    <Button
                      color="primary"
                      size="small"
                      type="button"
                      onClick={() => {
                        router.push(`/publish/${event?.id}`)
                      }}
                    >
                      <FiSend size={20} />
                      <span>Publicar Evento</span>
                    </Button>
                  </>
                }
              >
                Opções
              </Dropdown>
            </div>
            <div style={{ width: '100%' }}>
              <Select
                formRef={formRef}
                name="event"
                options={[{ label: 'Evento 1', value: '1' }]}
              />
            </div>
          </Form>
        }
      />
      <Alert type="warning" card>
        <h2>Atenção!</h2>
        Esse evento ainda não foi publicado!
      </Alert>
      <div style={{ marginBottom: '20px' }}>
        <Grid firstWidth="1330px" cols={4}>
          <div>
            <CardIcon
              title="Participantes"
              value={event?.participants + ''}
              icon={<FiUsers size={24} />}
              color="secondary"
              buttonName="Detalhar"
              buttonIcon={<FiInfo size={20} />}
              onButtonClick={() => {
                router.push(`/dashboard/${event?.id}/participants`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Certificados"
              value={event?.certificates + ''}
              icon={<FiAward size={24} />}
              color="info"
              buttonName="Adicionar"
              buttonIcon={<FiPlusCircle size={20} />}
              onButtonClick={() => {
                router.push(`/events/participants/${event?.id}`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Baixaram"
              value={event?.download + '%'}
              icon={<FiDownload size={24} />}
              color="primary"
              buttonName="Ver Downloads"
              buttonIcon={<FiInfo size={20} />}
              onButtonClick={() => {
                router.push(`/dashboard/${event?.id}/certificates/`)
              }}
            />
          </div>
          <div>
            <CardIcon
              title="Atividades"
              value={event?.activities + ''}
              icon={<FiFileText size={24} />}
              color="warning"
              buttonName="Adicionar"
              buttonIcon={<FiPlusCircle size={20} />}
              onButtonClick={() => {
                router.push(`/events/activities/${event?.id}`)
              }}
            />
          </div>
        </Grid>
      </div>
      <Card>
        <header>
          <h2>Últimos Eventos</h2>
          <Form onSubmit={handleFilter}>
            <Input name="search" placeholder="Buscar evento" icon={FiSearch} />
          </Form>
        </header>
      </Card>
    </Container>
  )
}

export default withAuth(Home)

import { useCallback, useState } from 'react'

import { ICertificate } from '../../dtos/ICertificate'
import IEvent from '../../dtos/IEvent'
import { Row } from '../../styles/components/grid'
import { Container } from '../../styles/components/tabs/eventCertificate'
import AddCertificate from '../accordions/addCertificate'
import CertificatePreview from '../accordions/certificatePreview'

interface Props {
  event: IEvent
}

const EventCertificate: React.FC<Props> = ({ event }) => {
  const [showList, setshowList] = useState(true)
  const [certificateList, setCertificateList] = useState<ICertificate[]>([
    {
      name: 'Modelo Padrão 3',
      front: {
        img: "'/teste1.png'",
        text:
          '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
      },
      roles: []
    },
    {
      name: 'Modelo para Professores',
      front: {
        img: "'/teste.jpeg'",
        text:
          '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
      },
      verse: {
        img: "'/teste.jpeg'",
        text:
          '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
      },
      roles: [
        {
          activity: {
            name: 'Mesa Redonda',
            id: '1'
          },
          function: {
            name: 'Palestrante',
            id: '1'
          }
        },
        {
          activity: {
            name: 'Mesa Redonda',
            id: '1'
          },
          function: {
            name: 'Professor',
            id: '1'
          }
        }
      ]
    }
  ])

  const handleOpen = useCallback(data => {
    if (data.isOpen) setshowList(false)
  }, [])

  const [editCertificate, setEditCertificate] = useState<ICertificate>(null)

  const handleClose = useCallback(() => {
    setshowList(true)
    setEditCertificate(null)
  }, [])

  return (
    <Container>
      <AddCertificate
        handleOnOpen={data => handleOpen(data)}
        handleOnClose={() => handleClose()}
        certificate={{
          name: '',
          front: {
            text:
              '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>',
            img: ''
          },
          roles: []
        }}
        event={event}
      />
      {editCertificate && (
        <AddCertificate
          handleOnOpen={data => handleOpen(data)}
          handleOnClose={() => handleClose()}
          certificate={editCertificate}
          edit={true}
          event={event}
        />
      )}
      {showList && (
        <Row cols={2}>
          {certificateList.map((certificate, index) => (
            <div key={index}>
              <CertificatePreview
                handleEdit={c => {
                  setEditCertificate(c)
                }}
                handleDelete={c => {
                  console.log(c)
                }}
                certificate={certificate}
              />
            </div>
          ))}
        </Row>
      )}
    </Container>
  )
}

export default EventCertificate

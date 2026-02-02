import AddCertificate from '@components/accordions/addCertificate'
import { ModelList } from '@components/accordions/modelList'
import { IEvent, IModelCertificate } from '@dtos'
import { useCallback, useState } from 'react'

import { Container } from './styles'

interface Props {
  event: IEvent
}

export const EventCertificate: React.FC<Props> = ({ event }) => {
  const [showList, setshowList] = useState(true)
  const [showAdd, setShowAdd] = useState(true)
  const [certificateList, setCertificateList] = useState<IModelCertificate[]>([
    // {
    //   id: '1',
    //   name: 'Modelo Padrão 3',
    //   front: {
    //     img: "'/teste1.png'",
    //     text:
    //       '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    //   },
    //   roles: []
    // },
    // {
    //   id: '2',
    //   name: 'Modelo para Professores',
    //   front: {
    //     img: "'/teste.jpeg'",
    //     text:
    //       '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    //   },
    //   verse: {
    //     img: "'/teste.jpeg'",
    //     text:
    //       '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>'
    //   },
    //   roles: [
    //     {
    //       number: 1,
    //       activity: {
    //         name: 'Mesa Redonda',
    //         id: '1'
    //       },
    //       function: {
    //         name: 'Palestrante',
    //         id: '1'
    //       }
    //     },
    //     {
    //       number: 2,
    //       activity: {
    //         name: 'Mesa Redonda',
    //         id: '1'
    //       },
    //       function: {
    //         name: 'Professor',
    //         id: '1'
    //       }
    //     }
    //   ]
    // }
  ])

  const [editCertificate, setEditCertificate] = useState<IModelCertificate>()

  const handleClose = useCallback(() => {
    setShowAdd(true)
    setEditCertificate(null)
  }, [])

  return (
    <Container>
      {event?.status !== 'PUBLISHED' && <AddCertificate eventId={event?.id} />}
      
      {/* Lista de modelos cadastrados */}
      <ModelList eventId={event?.id} />

      {/* {showAdd && (
        <AddCertificate
          certificate={{
            id: '1',
            name: '',
            front: {
              text:
                '<p>Certificamos que <strong>[participante_nome]</strong> participou da <strong>[evento_edicao] [evento_nome] ([evento_sigla])</strong> do Instituto Federal de Educação, Ciência e Tecnologia da Bahia (IFBA) Campus Vitória da Conquista, realizada no período de <strong>[participacao_periodo]</strong>, com carga horária de <strong>[participacao_carga_horaria]</strong></p>',
              img: ''
            },
            roles: []
          }}
          event={event}
        ></AddCertificate>
      )} */}

      {/* {editCertificate && (
        <AddCertificate
          handleOnOpen={data => {
            if (data.isOpen) {
              setShowAdd(false)
              setshowList(false)
            } else {
              setShowAdd(true)
              setEditCertificate(null)
              setshowList(true)
            }
          }}
          handleOnClose={() => {
            setshowList(true)
            setShowAdd(true)
            setEditCertificate(null)
          }}
          certificate={editCertificate}
          edit={true}
          event={event}
        />
      )}
      {showList && (
        <Grid firstWidth="1460px" cols={2}>
          {certificateList.map((certificate, index) => (
            <div key={index}>
              <CertificatePreview
                handleEdit={c => {
                  setShowAdd(false)
                  setEditCertificate(c)
                }}
                handleDelete={c => {
                  console.log(c)
                }}
                certificate={certificate}
              />
            </div>
          ))}
        </Grid>
      )} */}
    </Container>
  )
}

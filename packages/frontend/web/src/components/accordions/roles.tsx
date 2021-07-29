import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  FiAlertCircle,
  FiCheckSquare,
  FiPlus,
  FiSquare,
  FiMinus,
  FiX
} from 'react-icons/fi'

import { IRole } from '../../dtos/ICertificate'
import { Section } from '../../styles/components/accordion'
import Accordion from '../accordion'
import Alert from '../alert'
import Button from '../button'
import Modal from '../modal'
import Select from '../select'
import Table from '../table'

interface Props {
  onFormChange: (formRef: MutableRefObject<FormHandles>) => void
  preview?: boolean
  roles?: IRole[]
}

const Roles: React.FC<Props> = ({ onFormChange, preview, roles }) => {
  const formRef = useRef<FormHandles>(null)

  const [defaultModel, setDefaultModel] = useState(
    !roles ? false : roles.length === 0
  )
  const [roleList, setRoleList] = useState(roles || [])

  useEffect(() => {
    onFormChange(formRef)
  }, [formRef, onFormChange])

  const tableStyle: any = {}

  if (!preview) tableStyle.minWidth = '400px'

  const [openModal, setOpenModal] = useState(false)

  const addRole = useCallback(() => {
    const addFunction = formRef.current.getFieldValue('addFunction')
    const addActivity = formRef.current.getFieldValue('addActivity')
    const error: any = {}
    if (!addFunction) error.addFunction = 'Por favor, selecione uma função'
    if (!addActivity) error.addActivity = 'Por favor, selecione uma atividade'
    formRef.current.setErrors(error)
    if (!error.addFunction && !error.addActivity) {
      setRoleList([
        ...roleList,
        {
          activity: addActivity,
          function: addFunction,
          number:
            roleList.length === 0 ? 1 : roleList[roleList.length - 1].number + 1
        }
      ])
      formRef.current.setFieldValue('addFunction', null)
      formRef.current.setFieldValue('addActivity', null)
      setOpenModal(false)
    }
  }, [roleList])

  return (
    <Form
      ref={formRef}
      onSubmit={() => {
        console.log()
      }}
    >
      <Accordion icon={FiCheckSquare} title="Critérios">
        <Section paddingTop="md" paddingBottom="md">
          <div></div>
          <Button
            size="small"
            onClick={() => {
              setDefaultModel(!defaultModel)
            }}
            outline={defaultModel}
            inline
            type="button"
          >
            {!defaultModel ? (
              <FiCheckSquare size={20} />
            ) : (
              <FiSquare size={20} />
            )}
            <span>Possui algum critério?</span>
          </Button>
        </Section>
        {!defaultModel && (
          <>
            <Section paddingBottom="md">
              <Table>
                <thead>
                  <tr>
                    <th>Nº</th>
                    <th style={tableStyle}>Tipo de Atividade</th>
                    <th style={tableStyle}>Função</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {!preview && (
                    <>
                      <tr>
                        <td>-</td>
                        <td>
                          <Select
                            formRef={formRef}
                            name="addActivity"
                            isSearchable={false}
                            options={[
                              {
                                value: { name: 'Mesa Redonda', value: '1' },
                                label: 'Mesa Redonda'
                              },
                              {
                                value: { name: 'Palestra', value: '2 ' },
                                label: 'Palestra'
                              }
                            ]}
                          />
                        </td>
                        <td>
                          <Select
                            formRef={formRef}
                            name="addFunction"
                            isSearchable={false}
                            options={[
                              {
                                value: { name: 'Palestrante', value: '1' },
                                label: 'Palestrante'
                              },
                              {
                                value: { name: 'Professor', value: '1' },
                                label: 'Professor'
                              }
                            ]}
                          />
                        </td>
                        <td>
                          <Button
                            inline
                            square
                            color="success"
                            size="small"
                            type="button"
                            onClick={() => addRole}
                          >
                            <FiPlus size={20} /> <span>Adicionar</span>
                          </Button>
                        </td>
                      </tr>
                    </>
                  )}
                  {roleList.map((role, index) => (
                    <tr key={role.number}>
                      <td>{index + 1}</td>
                      <td>{role.activity.name}</td>
                      <td>{role.function.name}</td>
                      <td>
                        <Button
                          disabled={roleList.length === 1}
                          ghost
                          inline
                          square
                          color="danger"
                          size="small"
                          type="button"
                          onClick={() => {
                            roleList.splice(roleList.indexOf(role), 1)
                            setRoleList([...roleList])
                          }}
                        >
                          <FiMinus size={20} /> <span>Remover</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                  {preview && (
                    <tr>
                      <td colSpan={4}>
                        <Button
                          square
                          color="success"
                          size="small"
                          type="button"
                          onClick={() => {
                            setOpenModal(true)
                          }}
                        >
                          <FiPlus size={20} /> <span>Adicionar</span>
                        </Button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Section>
            {roleList.length === 0 && (
              <Section paddingBottom="md">
                <Alert type="danger" icon={FiAlertCircle}>
                  Você tem que selecionar ao menos 1 critério!
                </Alert>
              </Section>
            )}
          </>
        )}
        {defaultModel && (
          <Section paddingBottom="md">
            <Alert type="warning" icon={FiAlertCircle}>
              Atenção! Esse certificado será usado para todos os tipos de
              atividades e funções que não tenham nenhum modelo definido.
              <br />
              <b>Verifique se o texto fica consistente nesses casos</b>.
            </Alert>
          </Section>
        )}
      </Accordion>
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <header>
          <h2>Adicionar um Critério</h2>
        </header>
        <main>
          <Select
            marginBottom="sm"
            label="Tipo de Atividade"
            formRef={formRef}
            name="addActivity"
            isSearchable={false}
            options={[
              {
                value: { name: 'Mesa Redonda', value: '1' },
                label: 'Mesa Redonda'
              },
              {
                value: { name: 'Palestra', value: '2 ' },
                label: 'Palestra'
              }
            ]}
          />
          <Select
            label="Função"
            formRef={formRef}
            name="addFunction"
            isSearchable={false}
            options={[
              {
                value: { name: 'Palestrante', value: '1' },
                label: 'Palestrante'
              },
              {
                value: { name: 'Professor', value: '1' },
                label: 'Professor'
              }
            ]}
          />
        </main>
        <footer>
          <Button
            inline
            outline
            square
            color="secondary"
            onClick={() => {
              setOpenModal(false)
            }}
          >
            <FiX size={20} /> <span>Cancelar</span>
          </Button>
          <Button
            square
            color="success"
            type="button"
            onClick={() => {
              addRole()
            }}
          >
            <FiPlus size={20} /> <span>Adicionar</span>
          </Button>
        </footer>
      </Modal>
    </Form>
  )
}

export default Roles

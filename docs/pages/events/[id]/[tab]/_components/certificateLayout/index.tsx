import {
  Accordion,
  Button,
  Divider,
  Dropdown,
  RichTextEditor,
  Select,
  SliderBar,
  VariableModal
} from '@components'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import { useDebounce } from '@utils'
import {
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { FiTrash2 } from 'react-icons/fi'

import { Certificate } from '../'
import { EditContainer, LayoutContainer } from './styles'

const { Section } = Accordion

const initialTextPadding = {
  padding: 15,
  paddingTop: 15,
  paddingBottom: 15,
  paddingLeft: 15,
  paddingRight: 15
}
const initialValidatePadding = {
  validateVerticalPadding: 0,
  validateHorizontalPadding: 0
}

const initialTextPosition = 'center'
const initialValidatePosition = {
  validateVerticalPosition: 'bottom',
  validateHorizontalPosition: 'right'
}

export const initialTextConfig = {
  position: initialTextPosition,
  ...initialTextPadding,
  ...initialValidatePadding,
  ...initialValidatePosition
}

interface Props {
  text: string
  verse?: boolean
  onFormChange: (formRef: MutableRefObject<FormHandles>) => void
}

export const CertificateLayout: React.FC<Props> = ({
  text,
  verse,
  onFormChange
}) => {
  const [textConfig, setTextConfig] = useState<any>({
    html: text,
    ...initialTextConfig
  })
  const formRef = useRef<FormHandles>(null)

  useEffect(() => {
    onFormChange(formRef)
  }, [formRef, onFormChange])

  const [displayTextGuide, setDisplayTextGuide] = useState(false)
  const [displayValidateGuide, setDisplayValidateGuide] = useState(false)
  const [stateRichText, setStateRichText] = useState(null)

  const { run } = useDebounce<any>(config => {
    onConfigChange(config)
  })

  const onConfigChange = useCallback(config => {
    setTextConfig({ ...config })
  }, [])

  const [openModal, setOpenModal] = useState(false)

  const handleClose = useCallback(() => {
    setOpenModal(false)
  }, [])

  const handleAddVariable = useCallback(value => {
    setOpenModal(true)
    setStateRichText(value)
  }, [])

  const [dropdownTextActive, setdropdownTextActive] = useState(false)
  const [dropdownValidateActive, setDropdownValidateActive] = useState(false)
  const handleDropdownText = useCallback(({ active }) => {
    setDisplayTextGuide(active)
  }, [])
  const handleDropdownValidate = useCallback(({ active }) => {
    setDisplayValidateGuide(active)
  }, [])

  const [preview, setPreview] = useState('')

  return (
    <Form
      initialData={{ html: text, ...initialTextConfig }}
      ref={formRef}
      onSubmit={() => {
        console.log()
      }}
    >
      <Section paddingTop="sm" paddingBottom="sm">
        <div>
          <RichTextEditor
            handleAddVariable={state => handleAddVariable(state)}
            onChange={({ html }) =>
              onConfigChange({ ...textConfig, html: html })
            }
            initialHTMLValue={textConfig.html}
            label="Texto"
          />
        </div>
      </Section>
      <Divider />
      <Section paddingTop="sm" paddingBottom="sm">
        <EditContainer>
          <div className="first-button">
            <Dropdown
              active={dropdownTextActive}
              setActive={setdropdownTextActive}
              onChangeState={handleDropdownText}
              color="secondary"
              inline
              dropdownChildren={
                <div>
                  <Select
                    formRef={formRef}
                    handleOnSelect={data => {
                      onConfigChange({
                        ...textConfig,
                        position: data.value,
                        ...initialTextPadding
                      })
                    }}
                    initialValue="center"
                    label="Posição"
                    name="position"
                    options={[
                      {
                        value: 'center',
                        label: 'Centralizado'
                      },
                      {
                        value: 'custom',
                        label: 'Personalizado'
                      }
                    ]}
                    marginBottom="sm"
                  />
                  {textConfig?.position === 'center' && (
                    <SliderBar
                      formRef={formRef}
                      name="padding"
                      label="Margem"
                      marginBottom="sm"
                      min="0"
                      max="25"
                      onChange={data => {
                        run({
                          ...textConfig,
                          padding: parseInt(data.target.value)
                        })
                      }}
                    />
                  )}
                  {textConfig?.position === 'custom' && (
                    <SliderBar
                      formRef={formRef}
                      name="paddingTop"
                      label="Margem Cima"
                      marginBottom="sm"
                      min="0"
                      max="60"
                      onChange={data => {
                        run({
                          ...textConfig,
                          paddingTop: parseInt(data.target.value)
                        })
                      }}
                    />
                  )}
                  {textConfig?.position === 'custom' && (
                    <SliderBar
                      formRef={formRef}
                      name="paddingBottom"
                      label="Margem Baixo"
                      marginBottom="sm"
                      min="0"
                      max="60"
                      onChange={data => {
                        run({
                          ...textConfig,
                          paddingBottom: parseInt(data.target.value)
                        })
                      }}
                    />
                  )}
                  {textConfig?.position === 'custom' && (
                    <SliderBar
                      formRef={formRef}
                      name="paddingLeft"
                      label="Margem Esquerda"
                      marginBottom="sm"
                      min="0"
                      max="60"
                      onChange={data => {
                        run({
                          ...textConfig,
                          paddingLeft: parseInt(data.target.value)
                        })
                      }}
                    />
                  )}
                  {textConfig?.position === 'custom' && (
                    <SliderBar
                      formRef={formRef}
                      name="paddingRight"
                      label="Margem Direita"
                      marginBottom="sm"
                      min="0"
                      max="60"
                      onChange={data => {
                        run({
                          ...textConfig,
                          paddingRight: parseInt(data.target.value)
                        })
                      }}
                    />
                  )}
                </div>
              }
            >
              <span>Editar Layout Texto</span>
            </Dropdown>
          </div>
          <Dropdown
            active={dropdownValidateActive}
            setActive={setDropdownValidateActive}
            color="secondary"
            onChangeState={handleDropdownValidate}
            dropdownChildren={
              <div>
                <Select
                  formRef={formRef}
                  handleOnSelect={data => {
                    setTextConfig({
                      ...textConfig,
                      validateVerticalPosition: data.value
                    })
                  }}
                  label="Posição vertical"
                  name="validateVerticalPosition"
                  options={[
                    {
                      value: 'top',
                      label: 'Cima'
                    },
                    {
                      value: 'bottom',
                      label: 'Baixo'
                    }
                  ]}
                  marginBottom="sm"
                />
                <SliderBar
                  formRef={formRef}
                  name="validateVerticalPadding"
                  label={
                    'Margem ' +
                    (textConfig.validateVerticalPosition === 'top'
                      ? 'cima'
                      : 'baixo')
                  }
                  step="0.5"
                  marginBottom="sm"
                  min="0"
                  max="10"
                  onChange={data => {
                    run({
                      ...textConfig,
                      validateVerticalPadding: data.target.value
                    })
                  }}
                />
                <Select
                  formRef={formRef}
                  handleOnSelect={data => {
                    setTextConfig({
                      ...textConfig,
                      validateHorizontalPosition: data.value
                    })
                  }}
                  label="Posição horizontal"
                  name="validateHorizontalPosition"
                  options={[
                    {
                      value: 'left',
                      label: 'Esquerda'
                    },
                    {
                      value: 'center',
                      label: 'Centro'
                    },
                    {
                      value: 'right',
                      label: 'Direita'
                    }
                  ]}
                  marginBottom="sm"
                />
                {(textConfig.validateHorizontalPosition === 'left' ||
                  textConfig.validateHorizontalPosition === 'right') && (
                  <SliderBar
                    step="0.5"
                    formRef={formRef}
                    name="validateHorizontalPadding"
                    label={
                      'Margem ' +
                      (textConfig.validateHorizontalPosition === 'left'
                        ? 'esquerda'
                        : 'direita')
                    }
                    marginBottom="sm"
                    min="0"
                    max="10"
                    onChange={data => {
                      run({
                        ...textConfig,
                        validateHorizontalPadding: data.target.value
                      })
                    }}
                  />
                )}
              </div>
            }
          >
            Editar Layout Validação
          </Dropdown>
        </EditContainer>
        <div style={{ display: 'flex' }}>
          <LayoutContainer>
            <Certificate
              preview={preview}
              setPreview={setPreview}
              displayValidateGuide={displayValidateGuide}
              validateHorizontalPosition={textConfig.validateHorizontalPosition}
              validateVerticalPosition={textConfig.validateVerticalPosition}
              validateHorizontalPadding={textConfig.validateHorizontalPadding}
              validateVerticalPadding={textConfig.validateVerticalPadding}
              displayTextGuide={displayTextGuide}
              padding={textConfig.padding}
              position={textConfig.position}
              html={textConfig.html}
              paddingBottom={textConfig.paddingBottom}
              paddingTop={textConfig.paddingTop}
              paddingLeft={textConfig.paddingLeft}
              paddingRight={textConfig.paddingRight}
            />
          </LayoutContainer>
        </div>
        {preview && (
          <EditContainer style={{ marginTop: '10px' }}>
            <div>
              <Button
                size="small"
                outline
                color="danger"
                onClick={() => {
                  setPreview('')
                }}
                type="button"
              >
                <FiTrash2 /> <span>Redefinir Imagem</span>
              </Button>
            </div>
          </EditContainer>
        )}
      </Section>
      <VariableModal
        formRef={formRef}
        state={stateRichText}
        openModal={openModal}
        onClose={handleClose}
      />
    </Form>
  )
}

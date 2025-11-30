import { Button } from '@components'
import { Loading } from '@components/loading'
import { useToast } from '@providers'
import { useCallback, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import {
  FiSearch,
  FiFile,
  FiAlertCircle,
  FiCheckCircle,
  FiTrash2
} from 'react-icons/fi'

import { Container, ImageContainer, Info, TextContainer } from './styles'

const types = {
  image: '.jpg,.png',
  spreadsheet: '.xlsx,.xlsm,.xlsb,.xltx,.xltm,.xls,.xlt,.xml,.xlam,.xla,.ods'
}

interface Props {
  type: 'image' | 'spreadsheet'
  onUpload: (formData: FormData) => Promise<void> | void
  onRemove?: () => Promise<void> | void
  preview?: string
  height: string
  title?: string
  icon?: React.ComponentType<IconBaseProps>
  loading?: boolean
  info?: JSX.Element
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
}

export const FileChooser: React.FC<Props> = ({
  type,
  preview = '',
  height,
  title,
  icon,
  loading = false,
  info,
  marginBottom,
  onUpload,
  onRemove
}) => {
  const [file, setFile] = useState<File>()
  const [highlight, setHighlight] = useState(false)
  const { addToast } = useToast()

  const handleEnter = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      preview === '' && setHighlight(true)
    },
    [preview]
  )

  const handleOver = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      preview === '' && setHighlight(true)
    },
    [preview]
  )

  const handleLeave = useCallback(e => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }, [])

  const uploadFile = useCallback(
    (file: File) => {
      if (!(file instanceof File)) {
        addToast({
          type: 'error',
          title: 'Erro no arquivo',
          description:
            'Erro desconhecido, favor entrar em contato com o adminstrador.'
        })
        return
      }
      const format = file.name.split('.').pop()
      if (!types[type].includes(format)) {
        addToast({
          type: 'error',
          title: 'Erro no arquivo',
          description: `O formato ${format} não é permitido.`
        })
        return
      }

      const formData = new FormData()
      formData.append('file', file)
      setFile(file)
      onUpload(formData)
    },
    [addToast, onUpload, type]
  )

  const handleUpload = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      setHighlight(false)
      const [file] = e.target.files || e.dataTransfer.files
      uploadFile(file)
    },
    [uploadFile]
  )

  const handleRemove = useCallback(
    e => {
      e.preventDefault()
      e.stopPropagation()
      setFile(undefined)
      if (onRemove) onRemove()
    },
    [onRemove]
  )

  useEffect(() => {
    if (!preview && file && type === 'image') setFile(undefined)
  }, [file, preview, type])

  const Icon = icon || FiFile

  return (
    <Container
      background={!file}
      border={!preview}
      height={height}
      marginBottom={marginBottom}
    >
      <div
        onDragEnter={e => handleEnter(e)}
        onDragLeave={e => handleLeave(e)}
        onDragOver={e => handleOver(e)}
        onDrop={e => handleUpload(e)}
        className={`upload${
          highlight ? ' is-highlight' : preview ? ' is-drop' : ''
        }`}
        style={{
          backgroundImage:
            preview && `url(${process.env.baseURL}/upload/${preview})`
        }}
      >
        {!preview && (
          <div>
            {!loading && (
              <>
                <ImageContainer>
                  {file ? <FiCheckCircle size={70} /> : <Icon size={70} />}
                </ImageContainer>
                <TextContainer>
                  {file ? (
                    <>
                      <Icon size={20} /> {file.name}
                    </>
                  ) : (
                    title || 'Arraste o arquivo aqui'
                  )}
                </TextContainer>
              </>
            )}
            {file ? (
              <div>
                <Button
                  square
                  ghost
                  color="danger"
                  size="small"
                  type="button"
                  onClick={handleRemove}
                >
                  <FiTrash2 size={20} />
                  <span>Remover arquivo</span>
                </Button>
              </div>
            ) : (
              <div className="upload-button">
                <Loading active={!!loading} size={100} />
                <input
                  type="file"
                  className="upload-file"
                  accept={types[type]}
                  onChange={e => handleUpload(e)}
                  hidden={!!loading}
                />
                <Button
                  square
                  color="primary"
                  size="small"
                  type="button"
                  hidden={!!loading}
                >
                  <FiSearch size={20} />
                  <span>Clique aqui para procurar um arquivo</span>
                </Button>
              </div>
            )}
            {info && !loading && (
              <Info>
                <FiAlertCircle size={30} />
                <small>{info}</small>
              </Info>
            )}
          </div>
        )}
      </div>
    </Container>
  )
}

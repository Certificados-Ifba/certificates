import { Button } from '@components'
import { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { IconBaseProps } from 'react-icons'
import {
  FiSearch,
  FiAlertCircle,
  FiFile,
  FiCheckCircle,
  FiTrash2
} from 'react-icons/fi'

import { Container, ImageContainer, TextContainer, Info } from './styles'

export interface FileSelected {
  name: string
  file: any
}

interface Props {
  setPreview?: Dispatch<SetStateAction<string>>
  preview?: string
  height: string
  info?: ReactNode
  title?: string
  icon?: React.ComponentType<IconBaseProps>
  type: 'image' | 'spreadsheet'
  handleFileSelected: (file: FileSelected) => void
  handleFileRemoved?: () => void
}

export const FileChooser: React.FC<Props> = ({
  setPreview,
  preview,
  height,
  info,
  title,
  icon: Icon,
  type,
  handleFileSelected,
  handleFileRemoved
}) => {
  const [highlight, setHighlight] = useState(false)
  const [fileInfo, setFileInfo] = useState<FileSelected>(null)

  const handleEnter = e => {
    e.preventDefault()
    e.stopPropagation()
    preview === '' && setHighlight(true)
  }

  const handleOver = e => {
    e.preventDefault()
    e.stopPropagation()
    preview === '' && setHighlight(true)
  }

  const handleLeave = e => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
  }

  const handleUpload = e => {
    e.preventDefault()
    e.stopPropagation()
    setHighlight(false)
    const [file] = e.target.files || e.dataTransfer.files
    uploadFile(file)
  }

  function uploadFile(file: any) {
    const reader = new FileReader()
    if (reader) {
      if (file instanceof Blob) {
        reader.readAsBinaryString(file)

        reader.onload = () => {
          // this is the base64 data
          const fileRes = btoa(reader.result.toString())
          if (setPreview) setPreview(`data:image/jpg;base64,${fileRes}`)
          const info: FileSelected = { name: (file as any).name, file: fileRes }
          setFileInfo(info)
          handleFileSelected(info)
        }

        reader.onerror = () => {
          console.error('There is a problem while uploading...')
        }
      }
    }
  }

  useEffect(() => {
    setHighlight(preview === '')
  }, [preview])

  let accept: string
  if (type === 'image') {
    accept = 'image/*'
  } else if (type === 'spreadsheet') {
    accept = '.XLSX,.XLSM,.XLSB,.XLTX,.XLTM,.XLS,.XLT,.XML,.XLAM,.XLA,.ods'
  }

  return (
    <Container
      background={!fileInfo}
      border={!preview || preview === ''}
      height={height}
    >
      <div
        onDragEnter={e => handleEnter(e)}
        onDragLeave={e => handleLeave(e)}
        onDragOver={e => handleOver(e)}
        onDrop={e => handleUpload(e)}
        className={`upload${
          highlight ? ' is-highlight' : preview ? ' is-drop' : ''
        }`}
        style={{ backgroundImage: `url(${preview})` }}
      >
        {(!preview || preview === '') && (
          <div>
            {fileInfo && (
              <>
                <ImageContainer>
                  <FiCheckCircle size={70} />
                </ImageContainer>
                <TextContainer>
                  <h3>
                    {!Icon && <FiFile size={20}></FiFile>}
                    {Icon && <Icon size={20}></Icon>} {fileInfo.name}
                  </h3>
                </TextContainer>
              </>
            )}
            {!fileInfo && (
              <>
                <ImageContainer>
                  {!Icon && <FiFile size={70}></FiFile>}
                  {Icon && <Icon size={70}></Icon>}
                </ImageContainer>
                <TextContainer>
                  <h3>
                    {title}
                    {!title && 'Arraste o arquivo aqui'}
                  </h3>
                </TextContainer>
              </>
            )}

            {!fileInfo && (
              <div className="upload-button">
                <input
                  type="file"
                  className="upload-file"
                  accept={accept}
                  onChange={e => handleUpload(e)}
                />
                <Button
                  square
                  outline={!!fileInfo}
                  color="primary"
                  size="small"
                  type="button"
                  onClick={() => {
                    console.log()
                  }}
                >
                  <FiSearch size={20} />
                  <span>Clique aqui para procurar um arquivo</span>
                </Button>
              </div>
            )}
            {fileInfo && (
              <div>
                <Button
                  square
                  ghost
                  color="danger"
                  size="small"
                  type="button"
                  onClick={() => {
                    setFileInfo(null)
                    if (handleFileRemoved) handleFileRemoved()
                  }}
                >
                  <FiTrash2 size={20} />
                  <span>Remover arquivo</span>
                </Button>
              </div>
            )}
            {info && (
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

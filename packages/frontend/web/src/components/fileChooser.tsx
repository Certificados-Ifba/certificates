import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FiSearch, FiImage } from 'react-icons/fi'

import {
  Container,
  ImageContainer,
  TextContainer
} from '../styles/components/fileChooser'
import Button from './button'

interface FileChooserProps {
  setPreview: Dispatch<SetStateAction<string>>
  preview: string
  height: string
}

const FileChooser: React.FC<FileChooserProps> = ({
  setPreview,
  preview,
  height
}) => {
  const [highlight, setHighlight] = useState(false)
  const [drop, setDrop] = useState(false)

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
    setDrop(true)

    const [file] = e.target.files || e.dataTransfer.files

    uploadFile(file)
  }

  function uploadFile(file) {
    const reader = new FileReader()
    if (reader) {
      if (file instanceof Blob) {
        reader.readAsBinaryString(file)

        reader.onload = () => {
          // this is the base64 data
          const fileRes = btoa(reader.result.toString())
          setPreview(`data:image/jpg;base64,${fileRes}`)
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

  return (
    <Container border={preview === ''} height={height}>
      <div
        onDragEnter={e => handleEnter(e)}
        onDragLeave={e => handleLeave(e)}
        onDragOver={e => handleOver(e)}
        onDrop={e => handleUpload(e)}
        className={`upload${
          highlight ? ' is-highlight' : drop ? ' is-drop' : ''
        }`}
        style={{ backgroundImage: `url(${preview})` }}
      >
        {preview === '' && (
          <div>
            <ImageContainer>
              <FiImage size={70} />
            </ImageContainer>
            <TextContainer>
              <h3>Arraste a imagem do certificado aqui</h3>
            </TextContainer>
            <div className="upload-button">
              <input
                type="file"
                className="upload-file"
                accept="image/*"
                onChange={e => handleUpload(e)}
              />
              <Button
                square
                color="primary"
                size="small"
                type="button"
                onClick={() => {
                  console.log()
                }}
              >
                <FiSearch size={20} />{' '}
                <span>Clique aqui para procurar um arquivo</span>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default FileChooser

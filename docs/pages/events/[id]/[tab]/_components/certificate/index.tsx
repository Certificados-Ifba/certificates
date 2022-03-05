import { FileChooser } from '@components'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiImage } from 'react-icons/fi'

import {
  Container,
  Image,
  ImageContainer,
  TextContainer,
  ValidateContainer
} from './styles'

interface Props {
  position: 'center' | 'custom'
  html: string
  padding: number
  paddingTop: number
  paddingBottom: number
  paddingLeft: number
  paddingRight: number
  validateVerticalPadding: number
  validateHorizontalPadding: number
  displayTextGuide?: boolean
  displayValidateGuide?: boolean
  validateVerticalPosition: 'bottom' | 'top'
  validateHorizontalPosition: 'right' | 'left' | 'center'
  setPreview?: Dispatch<SetStateAction<string>>
  preview?: string
  image?: string
}

export const Certificate: React.FC<Props> = ({
  padding,
  html,
  position,
  paddingTop,
  paddingBottom,
  paddingLeft,
  paddingRight,
  displayTextGuide,
  validateHorizontalPosition,
  validateVerticalPosition,
  validateHorizontalPadding,
  validateVerticalPadding,
  displayValidateGuide,
  preview,
  setPreview,
  image
}) => {
  return (
    <>
      <Container>
        <ImageContainer>
          {image && <Image img={image}></Image>}
          {!image && (
            <FileChooser
              handleFileSelected={() => {
                console.log()
              }}
              type="image"
              info={
                <>
                  A imagem deve estar nas <b>dimenções A4</b> e orientação
                  paisagem. Dimensão: 1123 x 794 pixels (Largura x Altura).
                </>
              }
              title="Arraste a imagem do certificado aqui"
              icon={FiImage}
              height="878px"
              preview={preview}
              setPreview={setPreview}
            ></FileChooser>
          )}
          {preview && (
            <>
              <TextContainer
                displayGuide={displayTextGuide}
                paddingBottom={paddingBottom}
                paddingTop={paddingTop}
                paddingLeft={paddingLeft}
                paddingRight={paddingRight}
                padding={padding}
                position={position}
              >
                <div className="text">
                  <div
                    className="center"
                    dangerouslySetInnerHTML={{ __html: html }}
                  />
                </div>
              </TextContainer>
              <ValidateContainer
                displayGuide={displayValidateGuide}
                horizontalPosition={validateHorizontalPosition}
                verticalPosition={validateVerticalPosition}
                horizontalPadding={validateHorizontalPadding}
                verticalPadding={validateVerticalPadding}
              >
                <div className="text">
                  Código: <b>afae7289-6af4-4cbd-a16d-71247119914a</b> | Para
                  validar clique
                  <a href="http://certificados.ifba.edu.br/validar">aqui</a> ou
                  acesse
                  <a href="http://certificados.ifba.edu.br/validar">
                    http://certificados.ifba.edu.br/validar
                  </a>
                </div>
              </ValidateContainer>
            </>
          )}
        </ImageContainer>
      </Container>
    </>
  )
}

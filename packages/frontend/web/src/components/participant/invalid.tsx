import { FormHandles } from '@unform/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useRef } from 'react'
import { FiRepeat } from 'react-icons/fi'

import Button from '../../components/button'
import Card from '../../components/card'
import Help from '../../components/login/help'
import {
  ButtonContainer,
  Container,
  FormArea,
  FormContainer,
  ImageContainer
} from '../../styles/pages/participants'
import theme from '../../styles/theme'

const CertificateInvalid: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const router = useRouter()
  return (
    <>
      <Container maxWidth={500} login={false}>
        <Head>
          <title>Certificado Inválido | Certificados</title>
        </Head>
        {/* <LogoArea /> */}
        <FormArea
          ref={formRef}
          onSubmit={() => {
            console.log()
          }}
        >
          <Card>
            <header>
              <h2>
                <span style={{ color: theme.colors.danger }}>
                  Esse certificado é INVÁLIDO!
                </span>
              </h2>
            </header>
            <FormContainer padding={true}>
              <ImageContainer>
                <Image src="/invalid.svg" width="" height="200px"></Image>
              </ImageContainer>

              <ButtonContainer>
                <Button
                  onClick={() => {
                    router.push(`/validate`)
                  }}
                  size="small"
                  type="button"
                  ghost
                >
                  <FiRepeat size={20} />
                  <span>Digitar novamente</span>
                </Button>
              </ButtonContainer>
              <Help />
            </FormContainer>
          </Card>
        </FormArea>
      </Container>
    </>
  )
}

export default CertificateInvalid

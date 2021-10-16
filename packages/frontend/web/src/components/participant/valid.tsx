import { FormHandles } from '@unform/core'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  FiBriefcase,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCreditCard,
  FiEye,
  FiFileText,
  FiHash,
  FiLogIn,
  FiMail,
  FiPhoneCall,
  FiRepeat,
  FiSearch,
  FiUser
} from 'react-icons/fi'
import * as Yup from 'yup'

import Valid from '../../assets/valid.svg'
import Button from '../../components/button'
import Card from '../../components/card'
import Input from '../../components/input'
import Help from '../../components/login/help'
import LogoArea from '../../components/login/logoArea'
import withoutAuth from '../../hocs/withoutAuth'
import ParticipantLoginLayout from '../../layouts/participantLogin'
import { useToast } from '../../providers/toast'
import api from '../../services/axios'
import { Row as GridRow } from '../../styles/components/grid'
import Row from '../../styles/components/row'
import {
  TopButton,
  Container,
  FormArea,
  FormContainer,
  ImageContainer,
  ButtonContainer,
  InfoContainer,
  FooterContainer
} from '../../styles/pages/participants'
import theme from '../../styles/theme'
import getValidationErrors from '../../utils/getValidationErrors'
import Alert from '../alert'

const CertificateValid: React.FC = () => {
  const router = useRouter()
  const certificate = {
    participant: 'Lucas Nascimento Bertoldi',
    activity: 'Competição Baiana de Veículos Autônomos em Escala',
    activitieType: 'Competição',
    workload: 10,
    start_date: '2021-08-14T02:58:03.079Z',
    end_date: '2021-08-14T02:58:03.079Z',
    function: 'Ouvinte'
  }

  return (
    <>
      <Container marginTopSm={true} maxWidth={1000} login={false}>
        <Head>
          <title>Certificado Válido | Certificados</title>
        </Head>
        <Card>
          <header>
            <h2>
              <span style={{ color: theme.colors.success }}>
                Esse certificado é VÁLIDO!
              </span>
            </h2>
          </header>
          <FormContainer paddingSize="md" padding={true}>
            <GridRow cols={2}>
              <div>
                <InfoContainer>
                  <Alert marginBottom="sm" size="sm">
                    Atividade:
                  </Alert>
                  <Alert marginBottom="sm" icon={FiFileText}>
                    <b>{certificate.activity} </b>
                  </Alert>
                  <Alert marginBottom="sm" size="sm">
                    Participante:
                  </Alert>
                  <Alert marginBottom="sm" icon={FiUser}>
                    <b>{certificate.participant}</b>
                  </Alert>
                  <Alert marginBottom="sm" size="sm">
                    Função:
                  </Alert>
                  <Alert marginBottom="sm" icon={FiBriefcase}>
                    <b>{certificate.function} </b>
                  </Alert>
                  <Alert marginBottom="sm" size="sm">
                    Período:
                  </Alert>
                  <Alert marginBottom="md" icon={FiCalendar}>
                    <b>
                      De {new Date(certificate.start_date).toLocaleDateString()}{' '}
                      até{' '}
                      {new Date(certificate.start_date).toLocaleDateString()}
                    </b>
                  </Alert>
                  <Alert marginBottom="sm" size="sm">
                    Carga Horária:
                  </Alert>
                  <Alert marginBottom="md" icon={FiClock}>
                    <b>{certificate.workload} h</b>
                  </Alert>
                </InfoContainer>
              </div>
              <div>
                <FormContainer padding={true}>
                  <ImageContainer>
                    <Image src="/valid.svg" width="" height="200px"></Image>
                  </ImageContainer>
                </FormContainer>
              </div>
            </GridRow>
            <FooterContainer>
              <div>
                <Button
                  onClick={() => {
                    router.push(`/participants/login`)
                  }}
                  size="default"
                  type="button"
                >
                  <FiEye size={20}></FiEye>
                  <span>Visualizar Certificado</span>
                </Button>
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
                    <span>Verificar outro</span>
                  </Button>
                </ButtonContainer>
                <Help />
              </div>
            </FooterContainer>
          </FormContainer>
        </Card>
      </Container>
    </>
  )
}

export default CertificateValid

import HCaptcha from '@hcaptcha/react-hcaptcha'
import { useToast } from '@providers'
import { useField } from '@unform/core'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Error } from './styles'

const siteKey = process.env.siteKey

interface Props {
  name: string
}

export const Captcha: React.FC<Props> = ({ name }) => {
  const [token, setToken] = useState('')
  const { addToast } = useToast()
  const captchaRef = useRef<HCaptcha>(null)
  const { fieldName, registerField, error } = useField(name)

  const onExpire = useCallback(() => {
    setToken('')
    addToast({
      type: 'error',
      title: 'Erro no captcha',
      description: 'Captcha expirado, tente novamente'
    })
  }, [addToast])

  const onError = useCallback(
    err => {
      setToken('')
      addToast({
        type: 'error',
        title: 'Erro no captcha',
        description: `Erro: ${err}`
      })
    },
    [addToast]
  )

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: captchaRef.current,
      getValue: ref => {
        return token
      },
      setValue: (ref, newValue) => {
        setToken(newValue)
      },
      clearValue: ref => {
        setToken(null)
      }
    })
  }, [fieldName, registerField, token])

  return (
    <Container>
      <HCaptcha
        id={fieldName}
        sitekey={siteKey}
        onVerify={setToken}
        onError={onError}
        onExpire={onExpire}
        ref={captchaRef}
      />
      {error && (
        <Error>
          <FiAlertCircle size={16} />
          <span>{error}</span>
        </Error>
      )}
    </Container>
  )
}

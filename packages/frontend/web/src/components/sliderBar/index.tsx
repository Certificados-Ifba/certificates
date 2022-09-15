import { FormHandles, useField } from '@unform/core'
import { InputHTMLAttributes, MutableRefObject, useEffect, useRef } from 'react'
import { FiAlertCircle } from 'react-icons/fi'

import { Container, Label, Error } from './styles'

interface BaseProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  name: string
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
}

type Props = JSX.IntrinsicElements['input'] & BaseProps

export const SliderBar: React.FC<Props> = ({
  label,
  name,
  marginBottom,
  formRef,
  ...rest
}) => {
  const { type, min, max, ...restAux } = rest

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value) {
        ref.value = value || 0
      },
      clearValue: ref => {
        ref.value = 0
      }
    })
  }, [fieldName, registerField])

  const props: any = {
    min: min || 0,
    max: max || 100,
    ...restAux,
    ref: inputRef,
    id: fieldName,
    defaultValue
  }

  return (
    <>
      {label && !rest.hidden && <Label htmlFor={fieldName}>{label}</Label>}
      <Container hidden={rest.hidden} marginBottom={marginBottom}>
        <input type="range" {...(props as Props)} />

        {error && !rest.hidden && (
          <Error>
            <span>
              <FiAlertCircle />
            </span>{' '}
            <span>{error}</span>
          </Error>
        )}
      </Container>
    </>
  )
}

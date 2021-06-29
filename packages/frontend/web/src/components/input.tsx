import { FormHandles, useField } from '@unform/core'
import {
  InputHTMLAttributes,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle, FiEye, FiEyeOff } from 'react-icons/fi'

import {
  Container,
  Label,
  Error,
  SecureToggle
} from '../styles/components/input'
import { formatCpf, formatPhone } from '../utils/formatters'
// import { getInputDate } from '../utils/formatDate'

interface BaseProps<Multiline = false>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  note?: string
  name: string
  mask?: any
  type?: any
  icon?: React.ComponentType<IconBaseProps>
  multiline?: Multiline
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
}

type InputProps = JSX.IntrinsicElements['input'] & BaseProps<false>
type TextAreaProps = JSX.IntrinsicElements['textarea'] & BaseProps<true>

const Input: React.FC<InputProps | TextAreaProps> = ({
  label,
  note,
  name,
  mask,
  icon: Icon,
  multiline,
  marginBottom,
  formRef,
  ...rest
}) => {
  const { type, ...restAux } = rest

  const secure = type === 'password'

  const [inputState, setInputState] = useState<
    'isFilled' | 'isFocused' | 'hasError' | 'isDefault' | 'isDisabled'
  >('isDefault')
  const [isShowPass, setIsShowPass] = useState(false)

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  const clearFormError: () => void = useCallback(() => {
    if (formRef)
      try {
        const err = formRef.current.getErrors()
        delete err[name]
        formRef.current.setErrors(err)
      } catch (err) {}
  }, [formRef, name])

  const [lastError, setLastError] = useState(null)

  useEffect(() => {
    switch (inputState) {
      case 'isFocused': {
        clearFormError()
        break
      }
      case 'hasError': {
        break
      }
      case 'isDefault': {
        if (error) setInputState('hasError')
        break
      }
      case 'isFilled': {
        if (error && !inputRef.current?.value) {
          setInputState('hasError')
        } else {
          if (error && error !== lastError) {
            setInputState('hasError')
          } else {
            clearFormError()
            if (rest.disabled) setInputState('isDisabled')
          }
        }
        break
      }
      case 'isDisabled': {
        clearFormError()
        break
      }
    }
    setLastError(error)
  }, [
    error,
    formRef,
    inputState,
    name,
    rest.disabled,
    clearFormError,
    lastError
  ])

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value) {
        if (value && ref.type === 'date') {
          ref.value = new Date(value).toISOString().substr(0, 10)
        } else {
          ref.value = value || ''
        }

        setInputState(value ? 'isFilled' : 'isDefault')
      },
      clearValue: ref => {
        ref.value = ''
        setInputState('isDefault')
      }
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => {
    setInputState('isFocused')
  }, [])

  const handleShowPass = useCallback(() => {
    setIsShowPass(!isShowPass)
  }, [isShowPass])

  const handleInputBlur = useCallback(() => {
    setInputState(inputRef.current?.value ? 'isFilled' : 'isDefault')
  }, [])

  const handleKeyup = useCallback(() => {
    if (inputRef.current.value)
      if (type === 'cpf') {
        inputRef.current.value = formatCpf(inputRef.current.value)
      } else if (type === 'phone') {
        // if (inputRef.current.value.length > 3)
        inputRef.current.value = formatPhone(inputRef.current.value)
      }
  }, [type])

  const handleOnChange = useCallback(() => {
    if (inputState !== 'isFocused') {
      setInputState(inputRef.current?.value ? 'isFilled' : 'isDefault')
    }
  }, [inputState])

  const props: any = {
    ...restAux,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    onKeyUp: handleKeyup,
    onChange: handleOnChange,
    ref: inputRef,
    id: fieldName,
    'aria-label': fieldName,
    type: isShowPass ? 'text' : type,
    defaultValue
  }

  return (
    <>
      {label && !restAux.hidden && <Label htmlFor={fieldName}>{label}</Label>}
      <Container
        hidden={restAux.hidden}
        marginBottom={marginBottom}
        isErrored={inputState === 'hasError'}
        isFilled={inputState === 'isFilled'}
        isFocused={inputState === 'isFocused'}
        isDisabled={!!props?.disabled}
      >
        <fieldset>
          <div>{Icon && <Icon size={20} />}</div>
          {multiline ? (
            <textarea {...(props as TextAreaProps)} />
          ) : (
            <input {...(props as InputProps)} />
          )}
          {secure && (
            <SecureToggle onClick={handleShowPass}>
              {isShowPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </SecureToggle>
          )}
        </fieldset>
        {error && !restAux.hidden && (
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

export default Input

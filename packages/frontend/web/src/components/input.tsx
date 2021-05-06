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

  useEffect(() => {
    if (error) setInputState('hasError')
    if (!error && inputState === 'hasError')
      setInputState(inputRef?.current?.value ? 'isFilled' : 'isDefault')
  }, [error, inputState])

  useEffect(() => {
    const clearFormError: () => void = () => {
      if (formRef)
        try {
          const err = formRef.current.getErrors()
          delete err[name]
          formRef.current.setErrors(err)
        } catch (err) {}
    }
    if (inputState !== 'hasError' && !error) clearFormError()
    if (inputState === 'isFilled' && rest.disabled) setInputState('isDisabled')
    if (inputState === 'isFocused') clearFormError()
  }, [inputState, error, rest.disabled, formRef, name])

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value) {
        ref.value = value || ''
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

  const props: any = {
    ...restAux,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
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

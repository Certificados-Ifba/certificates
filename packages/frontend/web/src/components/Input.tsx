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

import { Container, Label, Error } from '../styles/components/Input'

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
  setValue?: React.Dispatch<React.SetStateAction<string>>
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
  setValue,
  ...rest
}) => {
  const { type, ...restaux } = rest

  const secure = type === 'password'

  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)
  const [isShowPass, setIsShowPass] = useState(false)

  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null)

  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
      setValue(ref: any, value) {
        ref.value = value
        ref.focus()
        ref.blur()
      }
    })
  }, [fieldName, registerField])

  const handleInputFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleShowPass = useCallback(() => {
    setIsShowPass(!isShowPass)
  }, [isShowPass])

  const handleInputBlur = useCallback(() => {
    setIsFocused(false)

    setIsFilled(!!inputRef.current?.value)
  }, [])

  const handleOnChangeInput = useCallback(data => {
    if (formRef)
      try {
        const err = formRef.current.getErrors()
        delete err[name]
        formRef.current.setErrors(err)
      } catch (err) {}
    if (setValue) setValue(data.target.value)
  }, [])

  const props: any = {
    ...restaux,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    ref: inputRef,
    id: fieldName,
    'aria-label': fieldName,
    type: isShowPass ? 'text' : type,
    defaultValue,
    onChange: handleOnChangeInput
  }

  return (
    <>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <Container
        hidden={restaux.hidden}
        marginBottom={marginBottom}
        error={error}
      >
        <fieldset>
          <div>{Icon && <Icon size={20} />}</div>
          {multiline ? (
            <textarea {...(props as TextAreaProps)} />
          ) : (
            <input {...(props as InputProps)} />
          )}
          {secure && (
            <div>
              {isShowPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}
            </div>
          )}
        </fieldset>
        {error && (
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

import { useField } from '@unform/core'
import {
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiEye, FiEyeOff } from 'react-icons/fi'

import { Container } from '../styles/components/Input'

interface BaseProps<Multiline = false>
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  note?: string
  name: string
  mask?: any
  type?: any
  icon?: React.ComponentType<IconBaseProps>
  multiline?: Multiline
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

  const props: any = {
    ...restaux,
    onFocus: handleInputFocus,
    onBlur: handleInputBlur,
    ref: inputRef,
    id: fieldName,
    'aria-label': fieldName,
    type: isShowPass ? 'text' : type,
    defaultValue
  }

  return (
    <Container>
      {label && <label htmlFor={fieldName}>{label}</label>}
      <div>{Icon && <Icon size={20} />}</div>
      {multiline ? (
        <textarea {...(props as TextAreaProps)} />
      ) : (
        <input {...(props as InputProps)} />
      )}
      {secure && (
        <div>{isShowPass ? <FiEye size={20} /> : <FiEyeOff size={20} />}</div>
      )}
    </Container>
  )
}

export default Input

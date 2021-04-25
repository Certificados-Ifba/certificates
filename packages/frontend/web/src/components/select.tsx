import { FormHandles, UnformField, useField } from '@unform/core'
import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  useCallback
} from 'react'
import theme from '../styles/theme'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import { Label, Error } from '../styles/components/input'
import { Container } from '../styles/components/select'
import { FiAlertCircle } from 'react-icons/fi'
interface Props extends SelectProps<OptionTypeBase> {
  name?: string
  label?: string
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
  hidden?: boolean
}

const normalStyle = {
  control: base => ({
    ...base,
    'border-radius': '5px',
    border: `2px solid ${theme.colors.mediumTint}`,
    color: `${theme.colors.mediumTint}`
  })
}

const errorStyle = {
  control: base => ({
    ...base,
    'border-radius': '5px',
    border: `2px solid ${theme.colors.danger}`,
    color: `${theme.colors.danger}`
  })
}

const filledStyle = {
  control: base => ({
    ...base,
    'border-radius': '5px',
    border: `2px solid ${theme.colors.primary}`,
    color: `${theme.colors.primary}`
  })
}

const Select: React.FC<Props> = ({
  name,
  marginBottom,
  label,
  formRef,
  hidden,
  ...rest
}) => {
  const [isFilled, setIsFilled] = useState(false)
  const selectRef = useRef(null)

  const handleOnChangeSelect = useCallback(() => {
    if (formRef) {
      try {
        const err = formRef.current.getErrors()
        delete err[name]
        formRef.current.setErrors(err)
      } catch (err) {}
    }
  }, [])

  const handleOnBlurSelect = useCallback(() => {
    setIsFilled(!!selectRef.current?.state.value)
  }, [])

  const props = {
    ref: selectRef,
    classNamePrefix: 'react-select',
    placeholder: 'Selecione',
    menuPosition: 'fixed',
    defaultValue: '',
    inputId: name,
    onChange: handleOnChangeSelect,
    onBlur: handleOnBlurSelect,
    ...rest
  }

  const [selectStyle, setSelectStyle] = useState(normalStyle)

  let fieldName: string
  let defaultValue: string
  let registerField: <T>(field: UnformField<T>) => void
  let error: string

  if (name) {
    const field = useField(name)

    fieldName = field.fieldName
    defaultValue = field.defaultValue
    registerField = field.registerField
    error = field.error

    useEffect(() => {
      if (isFilled) {
        setSelectStyle(filledStyle)
      } else if (error) {
        setSelectStyle(errorStyle)
      } else {
        setSelectStyle(normalStyle)
      }
    }, [error, isFilled])

    props.defaultValue = defaultValue

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: selectRef.current,
        setValue: (ref, value) => {
          const selected = ref.props.options.filter(
            (option: any) => option.value === value
          )
          ref.select.setValue(selected[0] || null)
          setIsFilled(selected[0] ? true : false)
        },
        getValue: (ref: any) => {
          if (rest.isMulti) {
            if (!ref.state.value) {
              return []
            }
            return ref.state.value.map((option: OptionTypeBase) => option.value)
          }
          if (!ref.state.value) {
            return ''
          }
          return ref.state.value.value
        },
        clearValue: ref => {
          ref.select.clearValue()
          setIsFilled(false)
        }
      })
    }, [fieldName, registerField, rest.isMulti])
  }

  return (
    <Container hidden={hidden} marginBottom={marginBottom}>
      <>
        {label && <Label htmlFor={name}>{label}</Label>}
        <ReactSelect
          styles={selectStyle}
          defaultValue={''}
          {...(props as Props)}
        />
        {error && (
          <Error>
            <span>
              <FiAlertCircle />
            </span>{' '}
            <span>{error}</span>
          </Error>
        )}
      </>
    </Container>
  )
}

export default Select

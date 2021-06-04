import { FormHandles, UnformField, useField } from '@unform/core'
import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  useCallback
} from 'react'
import { FiAlertCircle } from 'react-icons/fi'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'
import AsyncSelect from 'react-select/async'

import api from '../services/axios'
import { Label, Error } from '../styles/components/input'
import { Container } from '../styles/components/select'
import theme from '../styles/theme'
import { Debounce } from '../utils/debounce'

interface Props extends SelectProps<OptionTypeBase> {
  name?: string
  label?: string
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
  hidden?: boolean
  async?: boolean
  url?: string
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
  async,
  url,
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
  }, [formRef, name])

  const handleOnBlurSelect = useCallback(() => {
    if (async) {
      setIsFilled(!!selectRef.current?.select?.state.value)
    } else {
      setIsFilled(!!selectRef.current?.state.value)
    }
  }, [async])

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
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const field = useField(name)
    fieldName = field.fieldName
    defaultValue = field.defaultValue
    registerField = field.registerField
    error = field.error
  }

  useEffect(() => {
    if (name) {
      if (isFilled) {
        setSelectStyle(filledStyle)
      } else if (error) {
        setSelectStyle(errorStyle)
      } else {
        setSelectStyle(normalStyle)
      }
    }
  }, [name, error, isFilled])

  props.defaultValue = defaultValue

  useEffect(() => {
    if (name) {
      registerField({
        name: fieldName,
        ref: selectRef.current,
        setValue: (ref, value) => {
          let selected
          let options: any = []
          let setValue
          if (async) {
            options = ref.select.props.options
            setValue = ref.select.select.setValue
          } else {
            options = ref.props.options
            setValue = ref.select.setValue
          }
          if (value) {
            if (value.id) {
              const opt = { label: value.name, value: value.id }
              setDefaultOptions([opt])
              setFocusLoaded(false)
              selected = [opt]
            } else {
              selected = options.filter((option: any) => option.value === value)
            }
          }
          if (selected) {
            setValue(selected[0] || null)
            setIsFilled(!!selected[0])
          } else {
            setValue(null)
            setIsFilled(false)
          }
        },
        getValue: (ref: any) => {
          if (async) {
            const value = ref.select?.select.getValue()
            if (value.length === 1) {
              return value[0].value
            } else {
              return ''
            }
          } else {
            if (rest.isMulti) {
              if (!ref.state.value) {
                return []
              }
              return ref.state.value.map(
                (option: OptionTypeBase) => option.value
              )
            }
            if (!ref.state.value) {
              return ''
            }
            return ref.state.value.value
          }
        },
        clearValue: ref => {
          let clearValue
          if (async) {
            clearValue = ref.select?.select?.clearValue
          } else {
            clearValue = ref.select?.clearValue
          }
          clearValue()
          setIsFilled(false)
        }
      })
    }
  }, [name, fieldName, registerField, rest.isMulti, async])

  const [defaultOptions, setDefaultOptions] = useState([])
  const [focusLoaded, setFocusLoaded] = useState(false)

  const debounceFocus: Debounce<void> = new Debounce(async () => {
    const respApi = await api.get(url, {
      params: { search: '' }
    })

    const listOpt: any[] = []
    if (respApi?.data?.data) {
      const list = respApi?.data?.data
      for (const obj of list) {
        listOpt.push({ value: obj.id, label: obj.name })
      }
    }
    setDefaultOptions(listOpt)
  })

  const onFocus = () => {
    if (!focusLoaded) {
      setFocusLoaded(true)
      debounceFocus.notify()
    }
  }

  const debounceLoad: Debounce<{
    inputValue: string
    callback: any
  }> = new Debounce(async ({ inputValue, callback }) => {
    const resp = []

    const filter = (inputValue: string) => {
      return resp
    }

    try {
      const respApi = await api.get(url, {
        params: { search: inputValue }
      })

      if (respApi?.data?.data) {
        const list = respApi?.data?.data
        for (const obj of list) {
          resp.push({ value: obj.id, label: obj.name })
        }
      }
      callback(filter(inputValue))
    } catch (error) {
      console.error(error)
      callback(filter(inputValue))
    }
    callback(filter(inputValue))
  })

  const loadOptions = (inputValue, callback) => {
    debounceLoad.notify({ inputValue, callback })
  }

  return (
    <Container hidden={hidden} marginBottom={marginBottom}>
      <>
        {label && <Label htmlFor={name}>{label}</Label>}
        {!async && (
          <ReactSelect
            styles={selectStyle}
            defaultValue={''}
            {...(props as Props)}
          />
        )}
        {async && (
          <AsyncSelect
            loadOptions={loadOptions}
            onFocus={onFocus}
            defaultOptions={defaultOptions}
            styles={selectStyle}
            {...(props as Props)}
          />
        )}
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

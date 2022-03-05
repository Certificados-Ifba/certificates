import { api } from '@services'
import { theme } from '@styles'
import { FormHandles, UnformField, useField } from '@unform/core'
import { useDebounce } from '@utils'
import {
  useRef,
  useEffect,
  useState,
  MutableRefObject,
  useCallback
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import ReactSelect, {
  components,
  OptionTypeBase,
  Props as SelectProps
} from 'react-select'
import AsyncSelect from 'react-select/async'

import { Container, Label, Error } from './styles'

interface Props extends SelectProps<OptionTypeBase> {
  name?: string
  label?: string
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
  hidden?: boolean
  async?: boolean
  url?: string
  handleOnSelect?: (value: { label: string; value: any }) => void
  icon?: React.ComponentType<IconBaseProps>
  optionContent?: React.FC<{ props: any }>
  initialValue?: string
}

const normalStyle = {
  control: base => ({
    ...base,
    'font-size': '0.875rem',
    'border-radius': '5px',
    border: `2px solid ${theme.colors.mediumTint}`,
    color: `${theme.colors.mediumTint}`
  })
}

const errorStyle = {
  control: base => ({
    ...base,
    'font-size': '0.875rem',
    'border-radius': '5px',
    border: `2px solid ${theme.colors.danger}`,
    color: `${theme.colors.danger}`
  })
}

const filledStyle = {
  control: base => ({
    ...base,
    'font-size': '0.875rem',
    'border-radius': '5px',
    border: `2px solid ${theme.colors.primary}`,
    color: `${theme.colors.primary}`
  })
}

interface ContentProps {
  icon?: React.ComponentType<IconBaseProps>
  content: any
}

const SelectContent: React.FC<ContentProps> = ({ content, icon: Icon }) => {
  return (
    <>
      {Icon && <Icon style={{ marginLeft: '10px' }} size={20}></Icon>}
      {content}
    </>
  )
}

export const Select: React.FC<Props> = ({
  name,
  marginBottom,
  label,
  formRef,
  hidden,
  async,
  url,
  handleOnSelect,
  icon,
  optionContent: OptionContent,
  initialValue = '',
  ...rest
}) => {
  const [isFilled, setIsFilled] = useState(false)
  const selectRef = useRef(null)

  const handleOnChangeSelect = useCallback(
    data => {
      if (formRef) {
        try {
          const err = formRef.current.getErrors()
          delete err[name]
          formRef.current.setErrors(err)
        } catch (err) {}
      }
      if (handleOnSelect) {
        if (async) {
          handleOnSelect(data)
        } else {
          handleOnSelect(data)
        }
      }
      setIsFilled(!!data)
    },
    [formRef, handleOnSelect, name, async]
  )

  const selectOpt = useCallback(data => {
    console.log(data)
  }, [])

  const props = {
    ref: selectRef,
    classNamePrefix: 'react-select',
    placeholder: 'Selecione',
    menuPosition: 'fixed',
    defaultValue: initialValue,
    inputId: name,
    selectOption: selectOpt,
    onChange: handleOnChangeSelect,
    ...rest
  }

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

  let initialStyle = normalStyle

  props.defaultValue = rest.options?.find(data => data.value === defaultValue)
  if (props.defaultValue) initialStyle = filledStyle

  const [selectStyle, setSelectStyle] = useState(initialStyle)

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
              const opt = { label: value.name, value: value.id, ...value }
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

  const debounceFocus = useDebounce<void>(async () => {
    const respApi = await api.get(url, {
      params: { search: '' }
    })

    const listOpt: any[] = []
    if (respApi?.data?.data) {
      const list = respApi?.data?.data
      for (const obj of list) {
        listOpt.push({ value: obj.id, label: obj.name, ...obj })
      }
    }
    setDefaultOptions(listOpt)
    selectRef?.current?.select.focus()
  })

  const onFocus = () => {
    if (!focusLoaded) {
      setFocusLoaded(true)
      debounceFocus.run()
    }
  }

  const debounceLoad = useDebounce<{
    inputValue: string
    callback: any
  }>(async ({ inputValue, callback }) => {
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
          resp.push({ value: obj.id, label: obj.name, ...obj })
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
    debounceLoad.run({ inputValue, callback })
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
            components={{
              // eslint-disable-next-line react/display-name
              Option: props => {
                return (
                  <components.Option {...props}>
                    {OptionContent && <OptionContent props={props} />}
                    {!OptionContent && <>{props.children}</>}
                  </components.Option>
                )
              },
              // eslint-disable-next-line react/display-name
              Control: ({ children, ...rest }) => (
                <components.Control {...rest}>
                  <SelectContent content={children} icon={icon}></SelectContent>
                </components.Control>
              )
            }}
          />
        )}
        {async && (
          <AsyncSelect
            loadOptions={loadOptions}
            onFocus={onFocus}
            defaultOptions={defaultOptions}
            styles={selectStyle}
            {...(props as Props)}
            components={{
              // eslint-disable-next-line react/display-name
              Control: ({ children, ...rest }) => (
                <components.Control {...rest}>
                  <SelectContent content={children} icon={icon}></SelectContent>
                </components.Control>
              ),
              // eslint-disable-next-line react/display-name
              Option: props => {
                return (
                  <components.Option {...props}>
                    {OptionContent && <OptionContent props={props} />}
                    {!OptionContent && <>{props.children}</>}
                  </components.Option>
                )
              }
            }}
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

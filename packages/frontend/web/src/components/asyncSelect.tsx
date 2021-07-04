import { FormHandles, UnformField, useField } from '@unform/core'
import {
  useRef,
  useEffect,
  useState,
  useCallback,
  MutableRefObject
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { components, OptionTypeBase } from 'react-select'
import Select, { AsyncProps } from 'react-select/async'

import { Label, Error } from '../styles/components/input'
import { Container } from '../styles/components/select'
import theme from '../styles/theme'

interface Props extends AsyncProps<OptionTypeBase> {
  name: string
  label?: string
  marginBottom?: string
  formRef?: MutableRefObject<FormHandles>
  icon?: React.ComponentType<IconBaseProps>
  optionContent?: React.FC<{ props: any }>
  initialValue?: string
  handleOnSelect?: (value: { label: string; value: any }) => void
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

const AsyncSelect: React.FC<Props> = ({
  name,
  marginBottom,
  label,
  formRef,
  icon,
  optionContent: OptionContent,
  initialValue = '',
  handleOnSelect,
  ...rest
}) => {
  const [isFilled, setIsFilled] = useState(false)
  const selectRef = useRef(null)

  // const handleOnChangeSelect = useCallback(
  //   data => {
  //     if (formRef) {
  //       try {
  //         const err = formRef.current.getErrors()
  //         delete err[name]
  //         formRef.current.setErrors(err)
  //       } catch (err) {}
  //     }
  //     if (handleOnSelect) {
  //       handleOnSelect(data)
  //     }
  //     setIsFilled(!!data)
  //   },
  //   [formRef, handleOnSelect, name]
  // )

  // const selectOpt = useCallback(data => {
  //   console.log(data)
  // }, [])

  // const props = {
  //   ref: selectRef,
  //   classNamePrefix: 'react-select',
  //   placeholder: 'Selecione',
  //   menuPosition: 'fixed',
  //   defaultValue: initialValue,
  //   inputId: name,
  //   selectOption: selectOpt,
  //   onChange: handleOnChangeSelect,
  //   ...rest
  // }
  const { fieldName, defaultValue, registerField, error } = useField(name)

  useEffect(() => {
    if (isFilled) {
      setSelectStyle(filledStyle)
    } else if (error) {
      setSelectStyle(errorStyle)
    } else {
      setSelectStyle(normalStyle)
    }
  }, [error, isFilled])

  const initialStyle = normalStyle

  // props.defaultValue = rest.options?.find(data => data.value === defaultValue)
  // if (props.defaultValue) initialStyle = filledStyle

  const [selectStyle, setSelectStyle] = useState(initialStyle)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref.select.select.setValue(value)
      },
      getValue: (ref: any) => {
        const value = ref.select?.select.getValue()
        if (value.length === 1) {
          return value[0].value
        } else {
          return ''
        }
      },
      clearValue: ref => {
        ref.select.select.clearValue()
        setIsFilled(false)
      }
    })
  }, [fieldName, registerField])

  const props = {
    noOptionsMessage: () => 'Nenhuma opção',
    formatCreateLabel: (text: string) => `Criar "${text}"`,
    captureMenuScroll: false,
    defaultValue: defaultValue,
    ref: selectRef,
    classNamePrefix: 'react-select',
    isClearable: true,
    placeholder: 'Selecione',
    inputId: name,
    ...rest,
    theme: undefined
  }

  return (
    <Container marginBottom={marginBottom}>
      <>
        {label && <Label htmlFor={name}>{label}</Label>}
        <Select
          // cacheOptions
          // defaultOptions
          // isClearable
          // className="basic-single"
          // classNamePrefix="react-select"
          // name={name}
          // {...rest}
          styles={selectStyle}
          // cacheOptions
          menuPosition="fixed"
          {...props}
          // components={{
          //   // eslint-disable-next-line react/display-name
          //   Control: ({ children, ...rest }) => (
          //     <components.Control {...rest}>{children}</components.Control>
          //   ),
          //   // eslint-disable-next-line react/display-name
          //   Option: props => {
          //     return (
          //       <components.Option {...props}>
          //         {OptionContent && <OptionContent props={props} />}
          //         {!OptionContent && <>{props.children}</>}
          //       </components.Option>
          //     )
          //   }
          // }}
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

export default AsyncSelect

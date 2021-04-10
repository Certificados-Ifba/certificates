import { useField } from '@unform/core'
import { useRef, useEffect } from 'react'
import ReactSelect, { OptionTypeBase, Props as SelectProps } from 'react-select'

interface Props extends SelectProps<OptionTypeBase> {
  name?: string
}

const Select: React.FC<Props> = ({ name, ...rest }) => {
  const selectRef = useRef(null)
  const props = {
    ref: selectRef,
    classNamePrefix: 'react-select',
    placeholder: 'Selecione',
    menuPlacement: 'auto',
    defaultValue: '',
    ...rest
  }

  if (name) {
    const { fieldName, defaultValue, registerField, error } = useField(name)
    props.defaultValue = defaultValue

    useEffect(() => {
      registerField({
        name: fieldName,
        ref: selectRef.current,
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
        }
      })
    }, [fieldName, registerField, rest.isMulti])
  }

  return <ReactSelect defaultValue={''} {...(props as Props)} />
}

export default Select

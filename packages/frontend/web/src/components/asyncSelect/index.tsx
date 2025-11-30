/* eslint-disable react/display-name */
import { FormHandles, useField } from '@unform/core'
import { useDebounce } from '@utils'
import {
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { components, OptionTypeBase } from 'react-select'
import { Props as AsyncProps } from 'react-select/async'

import { Container, AsyncReactSelect, IconArea, Label, Error } from './styles'

interface Props extends AsyncProps<OptionTypeBase, boolean> {
  name: string
  label?: string
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  formRef?: MutableRefObject<FormHandles>
  icon?: React.ComponentType<IconBaseProps>
  handleOnSelect?: (value: { label: string; value: any }) => void
}

export const AsyncSelect: React.FC<Props> = ({
  name,
  marginBottom,
  label,
  formRef,
  icon: Icon,
  handleOnSelect,
  loadOptions,
  ...rest
}) => {
  const selectRef = useRef(null)
  const { fieldName, defaultValue, registerField, error } = useField(name)
  const [isFilled, setIsFilled] = useState(false)

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
        handleOnSelect(data)
      }
      setIsFilled(!!data)
    },
    [formRef, handleOnSelect, name]
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      setValue: (ref, value) => {
        ref?.select?.select?.setValue(value)
      },
      getValue: ref => {
        if (rest.isMulti) {
          if (!ref?.select?.state?.value) {
            setIsFilled(false)
            return []
          }

          return ref?.select?.state?.value?.map(
            (option: OptionTypeBase) => option?.value
          )
        }
        if (!ref?.select?.state?.value) {
          setIsFilled(false)
          return ''
        }

        setIsFilled(!!ref?.select?.state?.value?.value)
        return ref?.select?.state?.value?.value
      },
      clearValue: ref => {
        ref?.select?.select?.setValue()
        setIsFilled(false)
      }
    })
  }, [fieldName, registerField, rest])

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
    menuPosition: 'fixed',
    onChange: handleOnChangeSelect,
    components: {
      Control: ({ children, ...rest }: any) => (
        <components.Control {...rest}>
          <>
            {Icon && (
              <IconArea>
                <Icon size={20} />
              </IconArea>
            )}
            {children}
          </>
        </components.Control>
      )
    },
    ...rest,
    theme: undefined
  }

  const debounceLoad = useDebounce<{
    inputValue: string
    callback: any
  }>(async ({ inputValue, callback }) => {
    const resp = []
    const filter = (inputValue: string) => {
      return resp
    }

    const ret: any = await loadOptions(inputValue, callback)

    ret.forEach(data => {
      resp.push(data)
    })
    callback(filter(inputValue))
  })

  const loadDebounce = (inputValue, callback) => {
    debounceLoad.run({ inputValue, callback })
  }

  return (
    <Container className={rest.className} marginBottom={marginBottom}>
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <AsyncReactSelect
        loadOptions={loadDebounce}
        defaultOptions
        isFilled={isFilled}
        isErrored={!!error}
        cacheOptions
        {...props}
      />
      {error && (
        <Error>
          <span>
            <FiAlertCircle />
          </span>{' '}
          <span>{error}</span>
        </Error>
      )}
    </Container>
  )
}

import { FormHandles, UnformField, useField } from '@unform/core'
import {
  useRef,
  useEffect,
  MutableRefObject,
  useCallback,
  useState
} from 'react'
import { IconBaseProps } from 'react-icons'
import { FiAlertCircle } from 'react-icons/fi'
import { components, OptionTypeBase, Props as SelectProps } from 'react-select'

import { Container, Error, IconArea, Label, ReactSelect } from './styles'

interface Props extends SelectProps<OptionTypeBase, boolean> {
  name?: string
  label?: string
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  formRef?: MutableRefObject<FormHandles>
  icon?: React.ComponentType<IconBaseProps>
}

export const NewSelect: React.FC<Props> = ({
  name,
  marginBottom,
  label,
  formRef,
  icon: Icon,
  hidden,
  ...rest
}) => {
  const selectRef = useRef(null)
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
      setIsFilled(!!data)
    },
    [formRef, name]
  )
  let fieldName: string,
    defaultValue,
    registerField: <T>(field: UnformField<T>) => void,
    error: string

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
      registerField({
        name: fieldName,
        ref: selectRef.current,
        setValue: (ref, value) => {
          const selected = ref?.props?.options?.filter(
            (option: any) => option?.value === value
          )
          setIsFilled(!!selected[0])
          ref?.select?.setValue(selected[0] || null)
        },
        getValue: ref => {
          if (rest?.isMulti) {
            if (!ref?.state?.value) {
              setIsFilled(false)
              return []
            }
            return ref?.state?.value?.map(
              (option: OptionTypeBase) => option.value
            )
          }
          if (!ref?.state?.value) {
            setIsFilled(false)
            return ''
          }
          setIsFilled(!!ref?.state?.value?.value)
          return ref?.state?.value?.value
        },
        clearValue: ref => {
          setIsFilled(false)
          ref?.select?.clearValue()
          ref?.select?.focus()
          ref?.select?.blur()
        }
      })
    }
  }, [fieldName, name, registerField, rest])

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
      // eslint-disable-next-line react/display-name
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

  return (
    <Container
      className={props.className}
      marginBottom={marginBottom}
      hidden={hidden}
    >
      {label && <Label htmlFor={fieldName}>{label}</Label>}
      <ReactSelect
        isFilled={isFilled}
        isErrored={!!error}
        cacheOptions
        {...props}
      />
      {error && (
        <Error>
          <span>
            <FiAlertCircle />
          </span>
          <span>{error}</span>
        </Error>
      )}
    </Container>
  )
}

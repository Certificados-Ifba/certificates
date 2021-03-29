import { css } from 'react-select/src/components/Control'
import styled from 'styled-components'

interface Props {
  hidden?: boolean
}

export const Container = styled.fieldset<Props>`
  padding: 8px 12px;
  display: flex;
  align-self: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.mediumTint};
  color: ${props => props.theme.colors.mediumShade};
  ${props => props.hidden && 'display: none;'}
  div {
    display: inline-flex;
  }
  svg {
    margin-right: 8px;
  }
  input {
    border: none;
    font-size: 0.875rem;
    color: ${props => props.theme.colors.darkTint};
    ::placeholder {
      color: ${props => props.theme.colors.mediumShade};
    }
  }
`

export const Label = styled.label`
  font-weight: bold;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 8px;
`

export const Error = styled.span`
  color: ${props => props.theme.colors.danger};
  display: block;
  margin-top: 5px;
`

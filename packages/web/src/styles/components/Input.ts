import styled from 'styled-components'

export const Container = styled.fieldset`
  padding: 8px;
  display: flex;
  align-self: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.mediumTint};
  color: ${props => props.theme.colors.mediumShade};
  svg {
    display: flex-inline;
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

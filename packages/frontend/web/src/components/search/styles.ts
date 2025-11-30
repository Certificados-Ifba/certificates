import styled, { css } from 'styled-components'

export const Container = styled.fieldset`
  padding: 8px 12px;
  display: flex;
  align-self: center;
  border-radius: 5px;
  border: 2px solid ${props => props.theme.colors.mediumTint};
  color: ${props => props.theme.colors.mediumShade};
  background-color: ${props => props.theme.colors.lightTint};
  div {
    display: inline-flex;
  }
  svg {
    margin-right: 8px;
  }
  input {
    /* width: 150px; */
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    border: none;
    font-size: 0.875rem;
    color: ${props => props.theme.colors.darkTint};
    ::placeholder {
      color: ${props => props.theme.colors.mediumShade};
    }
  }
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0 30px ${props => props.theme.colors.lightTint}
      inset !important;
  }
  input,
  textarea {
    flex: 1;
  }
`

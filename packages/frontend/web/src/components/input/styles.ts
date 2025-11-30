import styled, { css } from 'styled-components'

interface Props {
  hidden?: boolean
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  isDisabled: boolean
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<Props>`
  margin-bottom: ${({ theme, marginBottom }) =>
    theme.margins[marginBottom] || 0};

  fieldset {
    padding: 8px 12px;
    display: flex;
    align-self: center;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.mediumTint};
    color: ${props => props.theme.colors.mediumShade};
    background-color: ${props => props.theme.colors.lightTint};

    ${props => props.hidden && 'display: none;'}
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

    ${props =>
      props.isErrored &&
      css`
        border-color: ${props => props.theme.colors.danger};
        color: ${props => props.theme.colors.danger};
      `}

    ${props =>
      props.isFilled &&
      css`
        border-color: ${props => props.theme.colors.primary};
        color: ${props => props.theme.colors.primary};
      `}

      ${props =>
      props.isFocused &&
      css`
        border-color: ${props => props.theme.colors.secondary};
        color: ${props => props.theme.colors.secondary};
      `}

    ${props =>
      props.isDisabled &&
      css`
        border-color: ${props => props.theme.colors.lightShade};
        color: ${props => props.theme.colors.mediumShade};
        background-color: ${props => props.theme.colors.lightShade};
        input {
          color: ${props => props.theme.colors.mediumShade} !important;
          background-color: ${props =>
            props.theme.colors.lightShade} !important;
        }
        input:-webkit-autofill,
        input:-webkit-autofill:hover,
        input:-webkit-autofill:focus,
        input:-webkit-autofill:active {
          -webkit-box-shadow: 0 0 0 30px
            ${props => props.theme.colors.lightShade} inset !important;
        }
      `}
  }
`

export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 8px;
`

export const Error = styled.div`
  color: ${props => props.theme.colors.danger};
  display: flex;
  margin-top: 5px;
  span {
    display: flex;
    font-size: 0.875rem;
  }
  svg {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 4px;
  }
`

export const SecureToggle = styled.button.attrs({
  type: 'button'
})`
  color: ${props => props.theme.colors.mediumShade};
  height: 20px;
  width: 20px !important;
  background-color: transparent;
  border: none;
`

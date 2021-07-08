import styled, { css } from 'styled-components'

interface Props {
  hidden?: boolean
  marginBottom?: string
  isDisabled: boolean
  isFocused: boolean
  isFilled: boolean
  isErrored: boolean
}

export const Container = styled.div<Props>`
  ${props =>
    props.marginBottom === 'sm' &&
    'margin-bottom:' + props.theme.margins.sm + ';'}
  ${props =>
    props.marginBottom === 'md' &&
    'margin-bottom:' + props.theme.margins.md + ';'}
${props =>
    props.marginBottom === 'lg' &&
    'margin-bottom:' + props.theme.margins.lg + ';'}

fieldset {
    padding: 8px 12px;
    display: flex;
    align-self: center;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.mediumTint};
    color: ${props => props.theme.colors.mediumShade};

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
      `}
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
    input,
    textarea {
      flex: 1;
    }
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
    margin-right: 3px;
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

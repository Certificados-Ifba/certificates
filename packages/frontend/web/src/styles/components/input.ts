import styled from 'styled-components'

interface Props {
  hidden?: boolean
  marginBottom?: string
  error?: any
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
    'margin-bottom:' + props.theme.margins.ld + ';'}

fieldset {
    padding: 8px 12px;
    display: flex;
    align-self: center;
    border-radius: 5px;
    border: 2px solid
      ${props =>
        props.error
          ? props.theme.colors.danger
          : props.theme.colors.mediumTint};
    color: ${props =>
      props.error ? props.theme.colors.danger : props.theme.colors.mediumShade};
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
  }
`

export const Label = styled.label`
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

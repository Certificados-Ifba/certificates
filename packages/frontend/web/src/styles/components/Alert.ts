import styled from 'styled-components'

interface Props {
  marginBottom?: string
  type: 'info' | 'warning' | 'danger'
  fontSize: string
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

    display: flex;
  .alert-icon {
    display: flex;
    svg {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
      margin-right: 10px;
      ${props =>
        props.type === 'danger' && 'color:' + props.theme.colors.danger + ';'}
      ${props =>
        props.type === 'warning' && 'color:' + props.theme.colors.warning + ';'}
    }
  }
  .message {
    margin-top: auto;
    margin-bottom: auto;
    font-size: ${props => props.fontSize};
  }
`

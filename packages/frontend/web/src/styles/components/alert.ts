import styled from 'styled-components'

interface Props {
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  type: 'info' | 'warning' | 'danger'
  fontSize: string
}

export const Container = styled.div<Props>`
  display: flex;
  margin-bottom: ${props => props.theme.margins[props.marginBottom] || 0};
  .alert-icon {
    display: flex;
    svg {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 10px;
      margin-right: 10px;
      color: ${props => props.theme.colors[props.type]};
    }
  }
  .message {
    margin-top: auto;
    margin-bottom: auto;
    font-size: ${props => props.fontSize};
  }
`

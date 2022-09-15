import styled from 'styled-components'

interface Props {
  width: number
}

export const Container = styled.div<Props>`
  .container {
    color: ${props => props.theme.colors.light};
    background-color: ${props => props.theme.colors.lightShade};
    border-radius: 10px;
  }

  .progress {
    padding: 0.01em 16px;
    text-align: center;
    color: ${props => props.theme.colors.light};
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px;
    width: ${props => props.width}%;
  }

  .progress:after,
  .progress:before {
    content: '';
    display: table;
    clear: both;
  }
`

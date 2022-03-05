import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.margins.md};
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

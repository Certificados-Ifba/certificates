import styled from 'styled-components'

interface RowProps {
  cols: 2 | 3 | 4
}

export const Row = styled.div<RowProps>`
  width: 100%;
  display: inline-grid;
  ${props => props.cols === 2 && 'grid-template-columns: 1fr 1fr;'}
  ${props => props.cols === 3 && 'grid-template-columns: 1fr 1fr 1fr;'}
  ${props => props.cols === 4 && 'grid-template-columns: 1fr 1fr 1fr 1fr;'}
  grid-gap: 10px;

  @media (max-width: ${props => props.theme.responsive.lgDown}) {
    ${props => props.cols === 3 && 'grid-template-columns: 1fr 1fr;'}
    ${props => props.cols === 4 && 'grid-template-columns: 1fr 1fr;'}
  }
  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    display: block;
  }
`

import styled, { css } from 'styled-components'

interface Props {
  cols: 2 | 3 | 4
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  firstWidth?: string
  secondWidth?: string
}

export const Grid = styled.div<Props>`
  width: 100%;
  display: inline-grid;
  ${props => props.cols === 2 && 'grid-template-columns: 1fr 1fr;'}
  ${props => props.cols === 3 && 'grid-template-columns: 1fr 1fr 1fr;'}
  ${props => props.cols === 4 && 'grid-template-columns: 1fr 1fr 1fr 1fr;'}
  grid-gap: 10px;
  margin-bottom: ${({ theme, marginBottom }) =>
    theme.margins[marginBottom] || 0};

  ${({ cols, firstWidth, theme }) => css`
    @media (max-width: ${firstWidth || theme.responsive.lgDown}) {
      ${(cols === 3 || cols === 4) && 'grid-template-columns: 1fr 1fr;'}
    }
  `}
  ${({ cols, firstWidth, secondWidth, theme }) => css`
    @media (max-width: ${cols === 2
        ? firstWidth || theme.responsive.mdDown
        : secondWidth || theme.responsive.mdDown}) {
      display: block;
      > * {
        margin-bottom: ${props => props.theme.margins.sm};
      }
    }
  `}
`

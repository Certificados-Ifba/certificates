import Select from 'react-select'
import styled, { css } from 'styled-components'

interface Props {
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
  isFilled?: boolean
  isErrored?: boolean
  hidden?: boolean
}

export const Container = styled.div<Props>`
  ${props => props.hidden && 'display: none;'}
  margin-bottom: ${({ marginBottom, theme }) =>
    marginBottom ? theme.margins[marginBottom] : 0};
`

export const ReactSelect = styled(Select)`
  .react-select__control {
    cursor: pointer;
    font-size: 0.875rem;
    border-radius: 5px;
    border: 2px solid ${({ theme }) => theme.colors.mediumTint};
    color: ${({ theme }) => theme.colors.mediumShade};
    &:hover {
      border-color: ${({ theme }) => theme.colors.mediumTint};
    }
    ${({ isFilled }) =>
      isFilled &&
      css`
        border-color: ${({ theme }) => theme.colors.primary} !important;
        color: ${({ theme }) => theme.colors.primary} !important;
        &:hover {
          border-color: ${({ theme }) => theme.colors.primary};
        }
      `}
    ${({ isErrored }) =>
      isErrored &&
      css`
        border-color: ${({ theme }) => theme.colors.danger} !important;
        color: ${({ theme }) => theme.colors.danger} !important;
        &:hover {
          border-color: ${({ theme }) => theme.colors.danger};
        }
      `}
  }
  .react-select__option--is-selected {
    color: inherit;
    background: ${({ theme }) => theme.colors.primary};
  }
  .react-select__control--is-focused {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
    box-shadow: none;
    &:hover {
      border-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.secondary};
    }
  }
  .react-select__control--is-disabled {
    background: ${({ theme }) => theme.colors.lightShade};
    border-color: ${({ theme }) => theme.colors.lightShade};
    .react-select__single-value {
      color: ${({ theme }) => theme.colors.mediumShade};
    }
  }
`

export const IconArea = styled.div`
  padding: 8px 0px 8px 12px;
  display: flex;
`

export const Group = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Badge = styled.span`
  background-color: ${({ theme }) => theme.colors.mediumTint};
  border-radius: 2em;
  color: ${({ theme }) => theme.colors.darkShade};
  display: inline-block;
  font-size: 12;
  font-weight: normal;
  line-height: 1;
  min-width: 1;
  padding: 0.16666666666667em 0.5em;
  text-align: center;
`

export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 8px;
`

export const Error = styled.div`
  color: ${({ theme }) => theme.colors.danger};
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

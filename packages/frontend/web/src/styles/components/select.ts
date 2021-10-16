import Select from 'react-select'
import AsyncSelect from 'react-select/async'
import styled, { css } from 'styled-components'

interface Props {
  marginBottom?: string
  isFilled?: boolean
  isErrored?: boolean
  hidden?: boolean
}

export const Container = styled.div<Props>`
  ${props => props.hidden && 'display: none;'}
  ${props =>
    props.marginBottom === 'sm' &&
    'margin-bottom:' + props.theme.margins.sm + ';'}
  ${props =>
    props.marginBottom === 'md' &&
    'margin-bottom:' + props.theme.margins.md + ';'}
${props =>
    props.marginBottom === 'lg' &&
    'margin-bottom:' + props.theme.margins.lg + ';'} /* .select {
    ${props =>
    props.isErrored &&
    css`
      border-color: ${props => props.theme.colors.danger};
      color: ${props => props.theme.colors.danger};
    `}
  } */
`

export const ReactSelect = styled(Select)`
  .react-select__control {
    cursor: pointer;
    font-size: 0.875rem;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.mediumTint};
    color: ${props => props.theme.colors.mediumShade};
    &:hover {
      border-color: ${props => props.theme.colors.mediumTint};
      ${props =>
        props.isFilled &&
        css`
          border-color: ${props => props.theme.colors.primary};
        `}
      ${props =>
        props.isErrored &&
        css`
          border-color: ${props => props.theme.colors.danger};
        `}
    }
    ${props =>
      props.isFilled &&
      css`
        border-color: ${props => props.theme.colors.primary} !important;
        color: ${props => props.theme.colors.primary} !important;
      `}
    ${props =>
      props.isErrored &&
      css`
        border-color: ${props => props.theme.colors.danger} !important;
        color: ${props => props.theme.colors.danger} !important;
      `}
  }
  .react-select__option--is-selected {
    color: inherit;
    background: ${props => props.theme.colors.primary};
  }
  .react-select__control--is-focused {
    border-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondary};
    box-shadow: none;
    &:hover {
      border-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.secondary};
    }
  }
  .react-select__control--is-disabled {
    background: ${props => props.theme.colors.lightShade};
    border-color: ${props => props.theme.colors.lightShade};
    .react-select__single-value {
      color: ${props => props.theme.colors.mediumShade};
    }
  }
`

export const AsyncReactSelect = styled(AsyncSelect)`
  .react-select__control {
    cursor: pointer;
    font-size: 0.875rem;
    border-radius: 5px;
    border: 2px solid ${props => props.theme.colors.mediumTint};
    color: ${props => props.theme.colors.mediumShade};
    &:hover {
      border-color: ${props => props.theme.colors.mediumTint};
      ${props =>
        props.isFilled &&
        css`
          border-color: ${props => props.theme.colors.primary};
        `}
      ${props =>
        props.isErrored &&
        css`
          border-color: ${props => props.theme.colors.danger};
        `}
    }
    ${props =>
      props.isFilled &&
      css`
        border-color: ${props => props.theme.colors.primary} !important;
        color: ${props => props.theme.colors.primary} !important;
      `}
    ${props =>
      props.isErrored &&
      css`
        border-color: ${props => props.theme.colors.danger} !important;
        color: ${props => props.theme.colors.danger} !important;
      `}
  }
  .react-select__option--is-selected {
    color: inherit;
    background: ${props => props.theme.colors.primary};
  }
  .react-select__control--is-focused {
    border-color: ${props => props.theme.colors.secondary};
    color: ${props => props.theme.colors.secondary};
    box-shadow: none;
    &:hover {
      border-color: ${props => props.theme.colors.secondary};
      color: ${props => props.theme.colors.secondary};
    }
  }
  .react-select__control--is-disabled {
    background: ${props => props.theme.colors.lightShade};
    border-color: ${props => props.theme.colors.lightShade};
    .react-select__single-value {
      color: ${props => props.theme.colors.mediumShade};
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
  background-color: ${props => props.theme.colors.mediumTint};
  border-radius: 2em;
  color: ${props => props.theme.colors.darkShade};
  display: inline-block;
  font-size: 12;
  font-weight: normal;
  line-height: 1;
  min-width: 1;
  padding: 0.16666666666667em 0.5em;
  text-align: center;
`

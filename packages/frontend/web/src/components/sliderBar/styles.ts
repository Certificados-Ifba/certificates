import styled from 'styled-components'

interface Props {
  hidden?: boolean
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
}

export const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 1rem;
  line-height: 20px;
  margin-bottom: 15px;
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

export const Container = styled.div<Props>`
  width: 100%;
  margin-bottom: ${({ theme, marginBottom }) =>
    theme.margins[marginBottom] || 0};

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 15px;
    background: ${props => props.theme.colors.mediumTint};
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 15px;
    margin-bottom: 10px;
    ${props => props.hidden && 'display: none;'}
  }

  input:hover {
    opacity: 1;
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 25px;
    height: 25px;
    background: ${props => props.theme.colors.primary};
    cursor: grabbing;
    border-radius: 15px;
  }

  input::-moz-range-thumb {
    width: 25px;
    height: 25px;
    background: ${props => props.theme.colors.primary};
    cursor: grabbing;
    border-radius: 15px;
  }
`

import styled from 'styled-components'

export const Container = styled.div`
  position: relative;
  display: inline;
  span {
    background: ${props => props.theme.colors.secondary};
    padding: 8px;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    position: absolute;
    bottom: calc(100% + 12px);
    left: 50%;
    transform: translateX(-50%);
    color: ${props => props.theme.colors.light};
    &::before {
      content: '';
      border-style: solid;
      border-color: ${props => props.theme.colors.secondary} transparent;
      border-width: 6px 6px 0 6px;
      top: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
    }
  }
  &:hover span {
    opacity: 1;
    visibility: visible;
    text-align: center;
  }
`

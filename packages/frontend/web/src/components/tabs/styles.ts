import { transparentize } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  padding-left: 10px;

  input {
    display: none;
  }
  label {
    border-radius: 10px 10px 0 0;
    padding: 15px 25px;
    color: ${props => props.theme.colors.mediumShade};
    margin-bottom: -1px;
    margin-left: -1px;
    display: inline-flex;
    align-items: center;
    font-size: 0.875rem;
    span {
      margin-left: 12px;
    }
  }

  input:checked + label {
    background-color: ${props => props.theme.colors.lightTint};
    color: ${props => props.theme.colors.primaryTint};
    cursor: pointer;
  }

  label:hover {
    color: ${props => props.theme.colors.primaryTint};
    cursor: pointer;
  }

  input:disabled + label {
    color: ${props => props.theme.colors.mediumTint};
    cursor: not-allowed;
  }
`

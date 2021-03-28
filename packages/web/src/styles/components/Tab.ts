import styled from 'styled-components'

export const Container = styled.div`
  padding-left: 10px;

  input {
    display: none;
  }
  label {
    border-radius: 10px 10px 0 0;
    display: inline-block;
    padding: 15px 25px;
    color: #ccc;
    margin-bottom: -1px;
    margin-left: -1px;
  }


  input:checked + label {
    background-color: ${props => props.theme.colors.lightTint};
    color: ${props => props.theme.colors.primaryTint};
    box-shadow: 0px -2px 6px 0px rgba(0, 0, 0, 0.05);
    cursor: pointer;
  }

  label:hover {
    color: ${props => props.theme.colors.primaryTint};
    cursor: pointer;
  }
`

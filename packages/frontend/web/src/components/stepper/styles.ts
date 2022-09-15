import styled, { css } from 'styled-components'

interface Props {
  active: boolean
  count: number
  selected: boolean
}

export const Step = styled.li<Props>`
  list-style-type: none;
  float: left;
  width: ${props => 100 / props.count}%;
  position: relative;
  text-align: center;
  :before {
    content: ' ';
    line-height: 30px;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    border: 1px solid #ddd;
    display: block;
    text-align: center;
    margin: 0 auto 10px;
    background-color: white;
  }

  :after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: #ddd;
    top: 15px;
    left: -50%;
    z-index: -1;
  }

  ${props => props.selected && 'font-weight: bold;'}

  ${props =>
    props.active &&
    css`
      :before {
        border-color: ${props => props.theme.colors.primary};
        background-color: ${props => props.theme.colors.primary};
      }
      :after {
        background-color: ${props => props.theme.colors.primary};
      }
    `}

    div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  div {
    @media (max-width: ${props => props.theme.responsive.smDown}) {
      font-size: 10px;
    }
  }
`

export const Container = styled.div`
  width: 100%;
  margin-bottom: 150px;

  .progressBar li:first-child:after {
    content: none;
  }
`

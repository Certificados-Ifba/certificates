import SimpleBar from 'simplebar-react'
import styled from 'styled-components'
import 'simplebar/dist/simplebar.min.css'

export const Container = styled.aside`
  height: 100vh;
  width: 100px;
  min-width: 100px;
  background-color: ${props => props.theme.colors.dark};

  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;

  transition: all 0.5s;

  @media (max-width: 768px) {
    position: absolute;
    z-index: 2;
    top: 100px;
    height: calc(100vh - 100px);
    transform: translateX(-100%);
    &.active {
      transform: translateX(0);
    }
  }

  &.active {
    min-width: 260px;
    span {
      display: block;
    }
  }
`

export const LogoArea = styled.div`
  padding: 23px;
  background-color: ${props => props.theme.colors.primary};
  height: 100px;
  width: 100%;

  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`

export const ScrollBar = styled(SimpleBar)`
  max-height: calc(100vh - 200px);
  padding: 20px 0;
  width: 100%;
`

export const Buttons = styled.ul`
  flex: 1;
  border-bottom: 1px solid #494e67;
  width: 100%;

  li {
    list-style: none;
    a {
      cursor: pointer;
      padding: 15px;
      margin: 15px 23px;
      border-radius: 10px;
      border: none;
      background-color: transparent;
      transition: all 0.25s;
      color: ${props => props.theme.colors.mediumShade};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 16px;
      font-weight: 600;
      svg {
        fill: ${props => props.theme.colors.mediumShade};
        fill-opacity: 0.2;
        min-width: 24px;
        min-height: 24px;
        polyline {
          fill-opacity: 0;
        }
      }
      span {
        display: none;
        margin-left: 20px;
      }
    }
    a[data-active='true'],
    :hover a {
      background-color: ${props => props.theme.colors.light};
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
      color: ${props => props.theme.colors.primaryTint};

      svg {
        fill: ${props => props.theme.colors.primaryTint};
      }
    }
  }
`

export const Button = styled.button`
  padding: 15px;
  margin: 23px;
  border-radius: 10px;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.mediumShade};
  transition: all 0.25s;

  svg {
    fill: ${props => props.theme.colors.mediumShade};
    fill-opacity: 0.2;
    polyline {
      fill-opacity: 0;
    }
  }

  :hover {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primaryTint};
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
    svg {
      fill: ${props => props.theme.colors.primaryTint};
    }
  }
`

import styled, { css } from 'styled-components'

export const TextContainer = styled.div`
  text-align: center;
  margin-bottom: 20px;
`

export const ImageContainer = styled.div`
  margin-bottom: 15px;
  display: flex;
  justify-content: center;
  width: 400px;
`

export const Info = styled.div`
  display: flex;
  margin-top: 15px;
  text-transform: none;
  small {
    margin-top: auto;
    margin-bottom: auto;
  }

  svg {
    margin-right: 10px;
  }
  color: ${props => props.theme.colors.secondary};
`

export const Container = styled.div<{
  height: string
  border: boolean
  background: boolean
}>`
  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${props => props.height};
    color: ${props => props.theme.colors.primary};
    ${props =>
      props.background &&
      css`
        background-color: ${props => props.theme.colors.mediumTint};
      `}
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    ${props => props.border && 'border-radius: 25px;'}

    > div {
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 1;
      transition: opacity 0.25s ease-in-out;
      > div {
        width: 400px;
      }
    }

    &.is-highlight {
      background-color: rgba(#4aa0ea, 0.5);

      > div {
        opacity: 1;
      }
    }

    &.is-drop {
      > div {
        opacity: 0;
      }
    }
  }

  .upload-button {
    width: 400px;
    position: relative;
  }

  .upload-file {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }
`

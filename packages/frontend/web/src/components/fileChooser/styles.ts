import { transparentize } from 'polished'
import styled, { css } from 'styled-components'

export const TextContainer = styled.h3`
  text-align: center;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
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
interface IContainer {
  height: string
  border: boolean
  background: boolean
  marginBottom?: 'sm' | 'md' | 'lg' | 'xs'
}

export const Container = styled.div<IContainer>`
  margin-bottom: ${({ theme, marginBottom }) =>
    theme.margins[marginBottom] || 0};
  .upload {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    position: relative;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: ${({ height }) => height};
    color: ${({ theme }) => theme.colors.primary};
    ${({ border }) =>
      border &&
      css`
        border-radius: 25px;
      `}
    ${({ background }) =>
      background
        ? css`
            background-color: ${({ theme }) => theme.colors.mediumTint};
          `
        : css`
            border-style: dashed;
          `}
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      opacity: 1;
      transition: opacity 0.25s ease-in-out;
      > div {
        @media (max-width: ${({ theme }) => theme.responsive.smDown}) {
          width: 90%;
          margin-left: auto;
          margin-right: auto;
        }
      }
    }

    &.is-highlight {
      background-color: ${({ theme }) =>
        transparentize(0.6, theme.colors.infoShade)};
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

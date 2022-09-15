import styled from 'styled-components'

interface Props {
  showInfo: boolean
}

export const Container = styled.div<Props>`
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.mediumTint};
  padding: 20px;
  > div {
    display: flex;
    justify-content: space-between;
    ${props => props.showInfo && 'margin-bottom: 10px;'}
  }

  :hover {
    box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.mediumTint};
  }
`

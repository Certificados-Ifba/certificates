import styled from 'styled-components'

interface ParticipantCardProps {
  showInfo: boolean
}

export const ParticipantCard = styled.div<ParticipantCardProps>`
  :hover {
    box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.mediumTint};
  }

  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.mediumTint};

  padding: 20px;

  h3 {
    display: flex;
    ${props => (props.showInfo ? 'margin-bottom: 10px;' : '')}
    span {
      margin-top: auto;
      margin-bottom: auto;
      margin-left: 5px;
    }
  }
`

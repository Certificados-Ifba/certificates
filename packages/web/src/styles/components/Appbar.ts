import styled from 'styled-components'

export const Container = styled.header`
  height: 100px;
  width: 100%;
  background-color: ${props => props.theme.colors.lightTint};

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 1;
`

export const Button = styled.button`
  padding: 15px;
  margin: 23px;
  border-radius: 100%;
  border: none;
  background-color: transparent;
  color: ${props => props.theme.colors.mediumShade};
  transition: all 0.25s;
  display: flex;

  :hover {
    background-color: ${props => props.theme.colors.light};
    color: ${props => props.theme.colors.primaryTint};
    box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.05);
  }
`
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  border-right: 1px solid ${props => props.theme.colors.mediumTint};
  padding: 7px 24px;
`
export const Info = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: end;
  span {
    color: ${props => props.theme.colors.mediumShade};
  }
`
export const Avatar = styled.div`
  min-width: 50px;
  min-height: 50px;
  background: ${props => props.theme.colors.secondaryTint};
  border-radius: 25px;
  justify-content: center;
  align-items: center;
  display: flex;
  margin-left: 14px;
  font-size: 24px;
  color: ${props => props.theme.colors.light};
  font-weight: 600;
`
export const Right = styled.div`
  display: flex;
  align-items: center;
`

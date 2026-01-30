import styled from 'styled-components'

// Estilos do componente CertificateInfo
export const Container = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`

export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: ${props => props.theme.responsive.smDown}) {
    flex-direction: column;
    gap: 10px;
  }
`

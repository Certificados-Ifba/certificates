import styled from 'styled-components'

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;

  padding: 10px;
`

export const Section = styled.div<{ paddingBottom?: boolean }>`
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  ${props => props.paddingBottom && 'padding-bottom: 20px;'}
`

export const SpanColor = styled.span<{ color: string }>`
  color: ${props => props.theme.colors[props.color]};
`

export const ExampleContainer = styled.div`
  display: flex;
  /* margin-top: 10px; */
  /* margin-left: 15px; */
  align-items: center;
  /* padding-bottom: 10px; */

  padding: 20px;

  @media (max-width: ${props => props.theme.responsive.smDown}) {
    display: block;
  }

  .example-button {
    width: 250px;
    @media (max-width: ${props => props.theme.responsive.smDown}) {
      width: 100%;
    }
  }

  .example-info {
    display: flex;
    margin-left: 15px;
    align-items: center;
    @media (max-width: ${props => props.theme.responsive.smDown}) {
      margin-top: 10px;
      margin-left: 0;
    }
  }
`

export const FileChooserContainer = styled.div`
  padding: 30px;

  @media (max-width: ${props => props.theme.responsive.smDown}) {
    padding: 10px;
  }
`
export const SheetTableContainer = styled.div`
  display: flex;
  width: 100%;
  margin-left: 10px;
  overflow-x: auto;
`

export const SheetTable = styled.table`
  min-width: 500px;
  border-collapse: collapse;
  th,
  td {
    border: 1px solid ${props => props.theme.colors.medium};
  }
`

export const Info = styled.small`
  padding-top: 10px;
  padding-bottom: 10px;
  text-align: center;
  display: block;

  .small {
    padding-bottom: 10px;
  }
`

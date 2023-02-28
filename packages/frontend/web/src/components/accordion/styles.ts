import styled from 'styled-components'

interface Props {
  open: boolean
}

export const Content = styled.div<Props>`
  ${({ open }) => open && 'display: none;'};
  header {
    min-height: 50px;
    padding: 25px 30px;
    border-bottom: 0;
  }
`

export const Footer = styled.div`
  display: flex;
  border-top: 2px solid ${props => props.theme.colors.lightShade};
  padding: 25px 30px;
  div {
    display: inline;
    margin-left: auto;
    @media (max-width: ${props => props.theme.responsive.smDown}) {
      display: block;
      margin: 0;
    }
  }
  div:last-child {
    margin-left: 10px;
  }
  @media (max-width: ${props => props.theme.responsive.smDown}) {
    display: block;
  }
`

export const Header = styled.div<Props>`
  ${({ open }) => !open && 'border-bottom: 2px solid #eef0f6;'};

  cursor: pointer;
  padding: 15px;
  display: flex;
  h2 {
    margin-left: 10px;
    display: inline;
    font-size: 1.25rem;
    margin-right: auto;
  }

  > div {
    display: flex;
    > svg {
      margin: auto;
    }
  }

  > div:first-child {
    margin-left: 10px;
  }
  > div:nth-of-type(2) {
    > svg {
      ${props => (props.open ? 'transform: rotate(180deg); ' : '')};
    }
    margin-right: 10px;
  }
  :hover {
    color: ${props => props.theme.colors.primary};
  }
`

export const Container = styled.div`
  :hover {
    box-shadow: 0px 0px 5px 0px ${props => props.theme.colors.mediumTint};
  }

  border-radius: 10px;
  box-shadow: 0px 0px 3px 0px ${props => props.theme.colors.mediumTint};
`

export const Section = styled.div<{
  paddingTop?: 'sm' | 'md' | 'lg' | 'xs'
  paddingBottom?: 'sm' | 'md' | 'lg' | 'xs'
}>`
  padding-left: 30px;
  padding-right: 30px;
  ${props =>
    props.paddingTop === 'sm' && 'padding-top:' + props.theme.margins.sm + ';'}
  ${props =>
    props.paddingTop === 'lg' && 'padding-top:' + props.theme.margins.lg + ';'}
${props =>
    props.paddingTop === 'md' && 'padding-top:' + props.theme.margins.md + ';'}
    ${props =>
    props.paddingTop === 'xs' && 'padding-top:' + props.theme.margins.xs + ';'}

     ${props =>
    props.paddingBottom === 'sm' &&
    'padding-bottom:' + props.theme.margins.sm + ';'}
  ${props =>
    props.paddingBottom === 'lg' &&
    'padding-bottom:' + props.theme.margins.lg + ';'}
    ${props =>
    props.paddingBottom === 'md' &&
    'padding-bottom:' + props.theme.margins.md + ';'}
        ${props =>
    props.paddingBottom === 'xs' &&
    'padding-bottom:' + props.theme.margins.xs + ';'}

  @media (max-width: ${props => props.theme.responsive.mdDown}) {
    padding-left: 15px;
    padding-right: 15px;
  }
`

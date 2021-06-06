import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement } from 'react'

export interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement
  activeLinks?: string[]
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  href,
  activeLinks,
  ...props
}) => {
  const router = useRouter()
  return (
    <Link href={href} {...props}>
      {(
        activeLinks
          ? activeLinks.some(link => link === router.pathname)
          : router.asPath === href
      )
        ? cloneElement(children, { 'data-active': true })
        : children}
    </Link>
  )
}

export default ActiveLink

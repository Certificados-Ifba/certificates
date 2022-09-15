import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement } from 'react'

interface Props extends LinkProps {
  children: React.ReactElement
  activeLinks?: string[]
}

export const ActiveLink: React.FC<Props> = ({
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

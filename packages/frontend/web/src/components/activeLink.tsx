import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import { cloneElement } from 'react'

export interface ActiveLinkProps extends LinkProps {
  children: React.ReactElement
}

const ActiveLink: React.FC<ActiveLinkProps> = ({
  children,
  href,
  ...props
}) => {
  const router = useRouter()
  return (
    <Link href={href} {...props}>
      {router.pathname === href
        ? cloneElement(children, { 'data-active': true })
        : children}
    </Link>
  )
}

export default ActiveLink

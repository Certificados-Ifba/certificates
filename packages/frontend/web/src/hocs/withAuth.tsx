import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

import DefaultLayout from '../layouts/default'
import { useAuth } from '../providers/auth'

const withAuth = (
  WrappedComponent: ElementType,
  onlyAdmin?: boolean
): ((props: unknown) => JSX.Element) => {
  const Wrapper = (props: unknown) => {
    const { isAdmin } = useAuth()
    const router = useRouter()
    useEffect(() => {
      const token = Cookie.get('certificates.session')

      if (!token) {
        router.replace('/login')
      }
      if (onlyAdmin && !isAdmin) {
        router.push('/')
      }
    }, [router, isAdmin])

    return (
      <DefaultLayout>
        <WrappedComponent {...props} />
      </DefaultLayout>
    )
  }
  return Wrapper
}

export default withAuth

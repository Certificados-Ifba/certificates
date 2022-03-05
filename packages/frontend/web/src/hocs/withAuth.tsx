import { DefaultLayout } from '@layouts'
import { useAuth } from '@providers'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

export const withAuth = (
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

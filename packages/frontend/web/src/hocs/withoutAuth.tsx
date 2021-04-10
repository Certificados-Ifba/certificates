import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

import AuthLayout from '../layouts/auth'

const withoutAuth = (
  WrappedComponent: ElementType
): ((props: unknown) => JSX.Element) => {
  const Wrapper = (props: unknown) => {
    const router = useRouter()
    useEffect(() => {
      const token = Cookie.get('certificates.session')

      if (token) {
        router.replace('/')
      }
    }, [])

    return (
      <AuthLayout>
        <WrappedComponent {...props} />
      </AuthLayout>
    )
  }
  return Wrapper
}

export default withoutAuth

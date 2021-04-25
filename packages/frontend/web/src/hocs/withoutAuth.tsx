import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, FC, useEffect } from 'react'

import AuthLayout from '../layouts/auth'

const withoutAuth = (
  WrappedComponent: ElementType,
  Layout: React.FC = AuthLayout
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
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    )
  }
  return Wrapper
}

export default withoutAuth

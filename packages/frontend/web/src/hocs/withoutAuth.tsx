import { AuthLayout, LoadingLayout } from '@layouts'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect, useState } from 'react'

export const withoutAuth = (
  WrappedComponent: ElementType,
  Layout: React.FC = AuthLayout
): ((props: unknown) => JSX.Element) => {
  const Wrapper = (props: unknown) => {
    const [token, setToken] = useState<string>()
    const router = useRouter()

    useEffect(() => {
      const token = Cookie.get('certificates.session')

      setToken(token)
      if (token) router.replace('/dashboard')
    }, [router])

    if (token && token !== undefined) return <LoadingLayout />

    return (
      <Layout>
        <WrappedComponent {...props} />
      </Layout>
    )
  }
  return Wrapper
}

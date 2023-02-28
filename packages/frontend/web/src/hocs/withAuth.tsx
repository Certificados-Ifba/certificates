import { DefaultLayout, LoadingLayout } from '@layouts'
import { useAuth } from '@providers'
import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect, useState } from 'react'

export const withAuth = (
  WrappedComponent: ElementType,
  onlyAdmin?: boolean
): ((props: unknown) => JSX.Element) => {
  const Wrapper = (props: unknown) => {
    const [token, setToken] = useState<string>()
    const router = useRouter()
    const { isAdmin } = useAuth()

    useEffect(() => {
      const token = Cookie.get('certificates.session')
      setToken(token)
      if (!token) router.replace('/login')
      if (onlyAdmin && !isAdmin) router.push('/dashboard')
    }, [isAdmin, router])

    if (!token) return <LoadingLayout />

    return (
      <DefaultLayout>
        <WrappedComponent {...props} />
      </DefaultLayout>
    )
  }
  return Wrapper
}

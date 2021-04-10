import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import { ElementType, useEffect } from 'react'

import DefaultLayout from '../layouts/defaultLayout'

const withAuth = (
  WrappedComponent: ElementType
): ((props: unknown) => JSX.Element) => {
  const Wrapper = (props: unknown) => {
    const router = useRouter()
    useEffect(() => {
      const token = Cookie.get('certificates.session')

      if (!token) {
        router.replace('/login')
      }
    }, [])

    return (
      <DefaultLayout>
        <WrappedComponent {...props} />
      </DefaultLayout>
    )
  }
  return Wrapper
}

export default withAuth

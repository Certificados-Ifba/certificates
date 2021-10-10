import { useRouter } from 'next/router'
import { useEffect } from 'react'

import withAuth from '../hocs/withAuth'

const Home: React.FC = () => {
  const router = useRouter()

  useEffect(() => {
    const lastEvent = {
      id: '60e8fbac290fc4003284701c'
    }
    router.push(`dashboard/${lastEvent.id}`)
  }, [router])

  return <></>
}

export default withAuth(Home)

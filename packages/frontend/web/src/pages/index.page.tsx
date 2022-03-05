import { withAuth } from '@hocs'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home: React.FC = () => {
  // const router = useRouter()

  // useEffect(() => {
  //   const lastEvent = {
  //     id: '60e8fbac290fc4003284701c'
  //   }
  //   router.push(`/dashboard/${lastEvent.id}`)
  // }, [router])

  return <>React</>
}

export default withAuth(Home)

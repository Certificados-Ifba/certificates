import { Button } from '@components'
import { withoutAuth } from '@hocs'
import { useValidate, ValidateProvider } from '@providers'
import { useRouter } from 'next/router'
import { FiLogIn, FiSearch } from 'react-icons/fi'

import { Valid, Verify } from './components'
import { TopButton } from './styles'

const ValidateComponent: React.FC = () => {
  const router = useRouter()
  const { certificate } = useValidate()

  return (
    <>
      <TopButton>
        <div>
          <Button
            onClick={() => {
              router.push(`/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiLogIn size={20} />
            <span>Acesso administrativo</span>
          </Button>
          <Button
            onClick={() => {
              router.push(`/participants/login`)
            }}
            size="small"
            type="button"
            inline
          >
            <FiSearch size={20} />
            <span>Encontrar Certificados</span>
          </Button>
        </div>
      </TopButton>
      {certificate ? <Valid /> : <Verify />}
    </>
  )
}

const Validate: React.FC = () => {
  return (
    <ValidateProvider>
      <ValidateComponent />
    </ValidateProvider>
  )
}

export default withoutAuth(Validate)

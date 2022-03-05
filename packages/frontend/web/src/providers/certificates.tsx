import { ICertificate } from '@dtos'
import { createContext, useCallback, useContext, useReducer } from 'react'

interface CertificatesContextData {
  certificates: ICertificate[]
  isEmpty: boolean
  handleRemove(certificate: ICertificate): void
  handleAdd(certificate: ICertificate): void
  handleUpdate(certificate: ICertificate, values: any): void
  handleReset(): void
}

type State = {
  certificates: ICertificate[]
}

const initialState: State = {
  certificates: []
}

type Action = {
  type: 'ADD_ITEM' | 'UPDATE_ITEM' | 'REMOVE_ITEM' | 'REMOVE_ALL'
  certificate?: ICertificate
  values?: any
}

const certificateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'ADD_ITEM': {
      return {
        ...state,
        certificates: [action.certificate, ...state.certificates]
      }
    }
    case 'UPDATE_ITEM': {
      const newCertificates = state.certificates.map(certificate => {
        console.log(action.values)

        if (certificate === action.certificate) {
          const updatedItem = Object.assign(certificate, action.values)

          return updatedItem
        }

        return certificate
      })
      console.log(action.certificate, newCertificates)

      return { ...state, certificates: newCertificates }
    }
    case 'REMOVE_ITEM': {
      const newCertificates = [...state.certificates]
      newCertificates.splice(newCertificates.indexOf(action.certificate), 1)
      return { ...state, certificates: newCertificates }
    }
    case 'REMOVE_ALL': {
      return { ...state, certificates: [] }
    }
    default:
      throw new Error()
  }
}

const CertificatesContext = createContext<CertificatesContextData>(
  {} as CertificatesContextData
)

export const CertificatesProvider: React.FC = ({ children }) => {
  const [listData, dispatchListData] = useReducer(
    certificateReducer,
    initialState
  )

  const handleRemove = useCallback((certificate: ICertificate) => {
    dispatchListData({ type: 'REMOVE_ITEM', certificate })
  }, [])

  const handleAdd = useCallback((certificate: ICertificate) => {
    dispatchListData({ type: 'ADD_ITEM', certificate })
  }, [])

  const handleReset = useCallback(() => {
    dispatchListData({ type: 'REMOVE_ALL' })
  }, [])

  const handleUpdate = useCallback((certificate: ICertificate, values: any) => {
    dispatchListData({ type: 'UPDATE_ITEM', certificate, values })
  }, [])

  return (
    <CertificatesContext.Provider
      value={{
        certificates: listData?.certificates,
        isEmpty: listData?.certificates.length === 0,
        handleRemove,
        handleAdd,
        handleUpdate,
        handleReset
      }}
    >
      {children}
    </CertificatesContext.Provider>
  )
}

export const useCertificates = (): CertificatesContextData => {
  const context = useContext(CertificatesContext)

  if (!context) {
    throw new Error(
      'useCertificates must be used within a CertificatesProvider'
    )
  }

  return context
}

import { Alert, Button } from '@components'
import { FiDownload, FiInfo } from 'react-icons/fi'

interface Props {
  loading: boolean
  onDownload: () => void
}

export const DownloadStep: React.FC<Props> = ({ loading, onDownload }) => {
  return (
    <>
      <Alert icon={FiInfo} marginBottom="sm">
        Você deve baixar a planilha de exemplo, preencher as linhas e depois
        enviar o arquivo para importar.
      </Alert>
      <Button onClick={onDownload} outline color="secondary" loading={loading}>
        <FiDownload size={20} />
        <span>Baixar Planilha de Exemplo</span>
      </Button>
    </>
  )
}

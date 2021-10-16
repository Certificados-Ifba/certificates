import { useCallback, useState } from 'react'
import {
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiInfo
} from 'react-icons/fi'
import XLSX from 'xlsx'

import { ExampleContainer } from '../../styles/components/import/import'
import { CardHeader } from '../../styles/pages/publish'
import Alert from '../alert'
import Button from '../button'
import { Column, Enum, types, value_column_enum } from './importObjects'
interface Props {
  enums: Enum[]
  onNext: () => void
  onPrevious: () => void
  columns: Column[]
}

const rows = 102

const DownloadStep: React.FC<Props> = ({
  enums,
  onPrevious,
  onNext,
  columns
}) => {
  const [downloaded, setDownload] = useState(false)
  const [nextText, setNextText] = useState('Faça o download antes')

  const loadFile = useCallback(async () => {
    const workbook = XLSX.utils.book_new()

    const insertsSheet: XLSX.WorkSheet = {}

    let columnCount = -1
    for (let index = 0; index < columns.length; index++) {
      const element = columns[index]
      insertsSheet[value_column_enum[index] + '1'] = {
        t: 's',
        v: element.name,
        h: element.name,
        w: element.name
      }

      for (let index1 = 2; index1 <= rows; index1++) {
        insertsSheet[value_column_enum[index] + index1] = {
          t: types[element.type],
          v: '',
          h: '',
          w: ''
        }
      }
      columnCount++
    }
    insertsSheet['!ref'] = 'A1:' + value_column_enum[columnCount] + rows

    XLSX.utils.book_append_sheet(workbook, insertsSheet, 'Cadastro')

    for (let index = 0; index < enums.length; index++) {
      const enumSheet: XLSX.WorkSheet = {}
      const element = enums[index]

      for (let index1 = 0; index1 < element.values.length; index1++) {
        enumSheet['A' + (index1 + 1)] = {
          t: 's',
          v: element.values[index1],
          h: element.values[index1],
          w: element.values[index1]
        }
      }

      enumSheet['!ref'] = 'A1:A' + (element.values.length + 1)

      console.log(enumSheet)

      XLSX.utils.book_append_sheet(workbook, enumSheet, element.name)
    }

    // const load = async () => {
    //   const resp = await fetch('/planilha_atividade_evento.xlsx')
    //   const buffer = await resp.arrayBuffer()
    //   return buffer
    // }
    // const buffer = await load()
    // const workbookFile = XLSX.read(buffer, { type: 'buffer' })
    // console.log(workbookFile)
    // return workbookFile
    return workbook
  }, [columns, enums])

  const downloadFile = useCallback((workbook: XLSX.WorkBook) => {
    const wopts: XLSX.WritingOptions = {
      bookType: 'xlsx',
      type: 'array'
    }
    const wbout = XLSX.write(workbook, wopts)
    const newBlob = new Blob([wbout], { type: 'application/octet-stream' })

    const blobUrl = window.URL.createObjectURL(newBlob)

    const link = document.createElement('a')
    link.href = blobUrl
    link.setAttribute('download', `importar.xlsx`)
    document.body.appendChild(link)
    link.click()
    link.parentNode.removeChild(link)
  }, [])

  return (
    <>
      <CardHeader>
        <Button
          ghost
          color="secondary"
          size="default"
          type="button"
          onClick={onPrevious}
          inline
        >
          <FiChevronLeft size={20} />
          <span>Voltar</span>
        </Button>
        <Button
          disabled={!downloaded}
          color={'primary'}
          size="default"
          type="button"
          onClick={() => {
            onNext()
          }}
          inline
        >
          <FiChevronRight size={20} /> <span>{nextText}</span>
        </Button>
      </CardHeader>
      <ExampleContainer>
        <div className="example-button">
          <Button
            onClick={async () => {
              const workbook = await loadFile()
              downloadFile(workbook)
              setDownload(true)
              setNextText('Avançar')
            }}
            outline
            color="secondary"
          >
            <FiDownload size={20}></FiDownload>
            <span>Baixar Planília de Exemplo</span>
          </Button>
        </div>
        <div className="example-info">
          <Alert icon={FiInfo} size="sm">
            Você deve baixar a planília de exemplo, preencher as linhas, e
            depois enviar o arquivo para importar.
          </Alert>
        </div>
      </ExampleContainer>
    </>
  )
}

export default DownloadStep

import {
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
  useState
} from 'react'
import {
  FiAlertCircle,
  FiCheck,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiSend
} from 'react-icons/fi'
import async from 'react-select/async'
import XLSX from 'xlsx'

import api from '../../services/axios'
import { Info, Section } from '../../styles/components/import/import'
import { CardHeader } from '../../styles/pages/publish'
import theme from '../../styles/theme'
import Accordion from '../accordion'
import Alert from '../alert'
import Button from '../button'
import { FileSelected } from '../fileChooser'
import ProgressBar from '../progressbar'
import Spinner from '../spinner'
import Table from '../table'
import Tooltip from '../tooltip'
import { column_value_enum, Column } from './importObjects'

export interface Props {
  columns?: Column[]
  sendURL: string
  file: FileSelected
  onNext: () => void
  onPrevious: () => void
}

const ImportStep: React.FC<Props> = ({
  columns,
  sendURL,
  file,
  onNext,
  onPrevious
}) => {
  const [listToSend, setListToSend] = useState([])
  const [errorCount, setErrorCount] = useState(0)

  const [nextDisabled, setNextDisabled] = useState(true)
  const [previousDisabled, setPreviousDisabled] = useState(true)

  const [start, setStart] = useState(false)

  const [status, setStatus] = useState<{
    percentage: number
    message: string
    type: 'loading' | 'error' | 'done'
    info?: string
  }>({
    percentage: 0,
    message: 'Iniciando...',
    type: 'loading'
  })

  const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  const getObject = (position: number, list: any[]) => {
    if (list.length > position) return list[position]
    return null
  }

  const handleSend = useCallback(
    async (item: any, current: number, total: number, errorCount: number) => {
      let success: boolean
      try {
        const response = await api.post(sendURL, item)
        item.status = 'ok'
        item.message = response.data.message
        if (item.name === 'Atividade 1') {
          throw new Error('Erro')
        }
        success = true
      } catch (e) {
        item.status = 'error'
        success = false
      }
      setStatus({
        percentage: ((current / total) * 100) | 0,
        message: 'Importando...',
        type: 'loading',
        info: `${current}/${total} lidos | ${errorCount} erros`
      })
      return success
    },
    [sendURL]
  )

  const handleSheetValue = useCallback(
    (list: any[], key: string, sheet: any, total: number, current: number) => {
      let column
      let position = 0
      try {
        position = parseInt(key.substr(1))
      } catch (error) {}

      if (position > 1) {
        try {
          column = key.substr(0, 1)
          const columnKey = columns[column_value_enum[column]].key
          let obj = getObject(position - 2, list)
          if (!obj) {
            obj = { status: 'not-send' }
            list.push(obj)
          }
          if (columns[column_value_enum[column]].type === 'date') {
            const dateParts = sheet[key].w.split('/')
            obj[columnKey] = new Date(
              +(dateParts[2].length === 2 ? '20' + dateParts[2] : dateParts[2]),
              dateParts[1] - 1,
              +dateParts[0]
            )
          } else {
            obj[columnKey] = sheet[key].v
          }
        } catch (error) {}
      }
      setStatus({
        percentage: ((current / total) * 100) | 0,
        message: 'Lendo arquivo...',
        type: 'loading',
        info: `${current}/${total} cedulas lidas`
      })
    },
    [columns]
  )

  const handleReadFile = useCallback(async () => {
    try {
      setStart(true)
      setStatus({ percentage: 0, message: 'Lendo arquivo...', type: 'loading' })
      const workbook = XLSX.read(file.file, { type: 'base64' })
      const sheetname = workbook.SheetNames[0]
      const sheet = workbook.Sheets[sheetname]
      let total = Object.keys(sheet).length
      let current = 0
      const list = []
      for (const key of Object.keys(sheet)) {
        handleSheetValue(list, key, sheet, total, current)
        current++
        await sleep(10)
      }

      for (const item of [...list]) {
        let ignore = true
        for (const key of Object.keys(item)) {
          if (item[key] && key !== 'status') {
            ignore = false
            break
          }
        }

        if (ignore) {
          list.splice(list.indexOf(item), 1)
        }
      }

      setListToSend([...list])
      total = list.length
      current = 0
      let error = 0
      for (const item of [...list]) {
        const success = await handleSend(item, current, total, error)
        current++
        if (!success) error++
        await sleep(10)
      }
      setErrorCount(error)
      setListToSend([...list])
      setStatus({
        percentage: 100,
        message: 'Importação completa',
        type: 'done',
        info: `${total - error} importados | ${error} erros`
      })
      setNextDisabled(false)
      setPreviousDisabled(false)
    } catch (error) {
      setNextDisabled(false)
      setPreviousDisabled(false)
      setStatus({
        percentage: 100,
        message: 'Erro ao ler o arquivo',
        type: 'error'
      })
    }
  }, [file, handleSend, handleSheetValue])

  if (!start) handleReadFile().then()
  return (
    <>
      <CardHeader>
        <Button
          disabled={nextDisabled}
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
          disabled={previousDisabled}
          color={'primary'}
          size="default"
          type="button"
          onClick={onNext}
          inline
        >
          <FiCheck size={20} /> <span>Retornar</span>
        </Button>
      </CardHeader>
      <Section>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px'
          }}
        >
          {status.type === 'loading' && <Spinner size={70}></Spinner>}
          {status.type === 'error' && (
            <FiAlertCircle
              color={theme.colors.danger}
              size={70}
            ></FiAlertCircle>
          )}
          {status.type === 'done' && (
            <FiCheckCircle
              color={theme.colors.success}
              size={70}
            ></FiCheckCircle>
          )}
        </div>

        <h2
          style={{
            textAlign: 'center'
          }}
        >
          {status.message}
        </h2>
      </Section>
      <Section>
        <ProgressBar width={status.percentage}></ProgressBar>

        <Info>
          <div className="small">{status.info}</div>

          {errorCount > 0 && status.type !== 'loading' && (
            <Alert type="danger" card={true}>
              Houveram <b>{errorCount} erro(s)</b> na importação. Verifique os
              registros importados para mais informações.
            </Alert>
          )}
        </Info>
      </Section>
      {listToSend.length > 0 && (
        <Section style={{ paddingBottom: '20px' }}>
          <Accordion
            title={
              status.type === 'loading'
                ? `Registros para Importação`
                : 'Registros Importados'
            }
          >
            <Table>
              <thead>
                <tr>
                  {columns?.map((col, index) => (
                    <td key={index}>{col.name}</td>
                  ))}
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {listToSend.map((value, index) => (
                  <tr
                    style={{
                      color:
                        value.status === 'error'
                          ? theme.colors.danger
                          : theme.colors.darkShade
                    }}
                    key={index}
                  >
                    {columns.map((col, index1) => (
                      <td key={index1}>
                        {col.type === 'date' && value[col.key]
                          ? value[col.key].toLocaleDateString()
                          : ''}
                        {col.type !== 'date' && '' + value[col.key]}
                      </td>
                    ))}

                    <td>
                      <span>
                        <Tooltip title={value.message}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'center'
                            }}
                          >
                            {value.status === 'ok' && (
                              <FiCheckCircle
                                color={theme.colors.success}
                                size={20}
                              ></FiCheckCircle>
                            )}
                            {value.status === 'not-send' && (
                              <FiSend
                                color={theme.colors.secondary}
                                size={20}
                              ></FiSend>
                            )}
                            {value.status === 'error' && (
                              <FiAlertCircle
                                color={theme.colors.danger}
                                size={20}
                              ></FiAlertCircle>
                            )}
                          </div>
                        </Tooltip>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Accordion>
        </Section>
      )}
    </>
  )
}

export default ImportStep

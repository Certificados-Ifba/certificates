import { Alert, Button, FileChooser, FileSelected } from '@components'
import { useState } from 'react'
import { FiChevronLeft, FiChevronRight, FiInfo } from 'react-icons/fi'

import { Column, Enum, Rows } from '../interfaces'
import {
  CardHeader,
  FileChooserContainer,
  Section,
  SheetTable,
  SheetTableContainer,
  SpanColor
} from './styles'

interface Props {
  columns?: Column[]
  examples?: Rows[]
  enums?: Enum[]
  onNext: (file: FileSelected) => void
  onPrevious: () => void
}

export const InfoStep: React.FC<Props> = ({
  columns,
  examples,
  enums,
  onNext,
  onPrevious
}) => {
  const [nextText, setNextText] = useState('Faça o download antes')

  const [file, setFile] = useState<FileSelected>(null)
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
          disabled={!file}
          color={'primary'}
          size="default"
          type="button"
          onClick={() => {
            onNext(file)
          }}
          inline
        >
          <FiChevronRight size={20} />
          <span>{nextText}</span>
        </Button>
      </CardHeader>
      <div>
        <Section>
          <Alert icon={FiInfo}>
            Faça o upload da planilha que você baixou na tela anterior.
          </Alert>
        </Section>
        <FileChooserContainer>
          <FileChooser
            handleFileSelected={(file: FileSelected) => {
              setFile(file)
              setNextText('Avançar')
            }}
            handleFileRemoved={() => {
              setFile(null)
              setNextText('Selecione o arquivo antes')
            }}
            type={'spreadsheet'}
            height="400px"
          />
        </FileChooserContainer>

        <Section>
          <Alert card={true} type="warning">
            <b>Atenção!</b> <br />A única forma da importação funcionar é que a
            planilha cumpra as seguintes regras.
          </Alert>
        </Section>

        {columns && (
          <>
            <Section>
              <Alert icon={FiInfo} marginBottom="sm">
                A planilha <b>deve conter as mesmas colunas</b> exibidas na
                próxima tabela de exemplo:
              </Alert>
              <SheetTableContainer>
                <SheetTable>
                  <thead>
                    <tr>
                      {columns.map((colum: any, index) => {
                        return (
                          <th key={index}>
                            {!colum.color && '' + colum.name}
                            {colum.color && (
                              <SpanColor color={colum.color}>
                                {colum.name}
                              </SpanColor>
                            )}
                          </th>
                        )
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {examples.map((row, index) => {
                      return (
                        <tr key={index}>
                          {row.values.map((value, index1) => {
                            return <td key={index1}>{value}</td>
                          })}
                        </tr>
                      )
                    })}
                  </tbody>
                </SheetTable>
              </SheetTableContainer>
            </Section>
          </>
        )}

        {enums &&
          enums.map((e, index) => {
            return (
              <Section key={index} paddingBottom={true}>
                <Alert icon={FiInfo} marginBottom="sm">
                  A{' '}
                  <b>
                    coluna {!e.color && e.name}
                    {e.color && <SpanColor color={e.color}>{e.name}</SpanColor>}
                  </b>{' '}
                  ter os <b>seguintes valores</b>:
                </Alert>
                <ul style={{ marginLeft: '30px' }}>
                  {e.values.map((value, index1) => {
                    return <li key={index1}>{value.name}</li>
                  })}
                </ul>
              </Section>
            )
          })}
      </div>
    </>
  )
}

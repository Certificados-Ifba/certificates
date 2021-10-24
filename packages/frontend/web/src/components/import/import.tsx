import Head from 'next/head'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { FiFilePlus } from 'react-icons/fi'

import { Container } from '../../styles/pages/home'
import Card from '../card'
import { FileSelected } from '../fileChooser'
import Spinner from '../spinner'
import Stepper, { getSelected, getStepList, StepConfig } from '../stepper'
import DownloadStep from './downloadStep'
import { Column, Enum, ExtraBody, Rows } from './importObjects'
import ImportStep from './importStep'
import InfoStep from './infoStep'

export const infoName = 'Instruções'
export const downloadName = 'Download'
export const importName = 'Importando'

export const stepConfig: StepConfig[] = [
  { name: downloadName },
  { name: infoName },
  { name: importName }
]

export interface Props {
  title: string
  windowTitle: string
  backRoute: string
  finishRoute?: string
  columns?: Column[]
  examples?: Rows[]
  enums?: Enum[]
  sendURL: string
  extraBody?: ExtraBody[]
  loading?: boolean
  createSchema?: (item: any) => any
}

const Import: React.FC<Props> = ({
  title,
  backRoute,
  windowTitle,
  finishRoute,
  columns,
  examples,
  enums,
  sendURL,
  loading,
  extraBody,
  createSchema
}) => {
  const router = useRouter()
  const [steps, setSteps] = useState(getStepList(stepConfig, 0))
  const [file, setFile] = useState<FileSelected>(null)

  const next = useCallback(() => {
    const selected = getSelected(steps)
    if (selected.name === importName) {
      router.push(finishRoute || backRoute)
    } else {
      if (selected.name === downloadName) {
        setFile(null)
      }
      setSteps(getStepList(stepConfig, selected.id + 1))
    }
  }, [backRoute, finishRoute, router, steps])
  const back = useCallback(() => {
    const selected = getSelected(steps)
    if (selected.name === downloadName) {
      router.push(backRoute)
    } else {
      if (selected.name === importName) {
        setFile(null)
      }
      setSteps(getStepList(stepConfig, selected.id - 1))
    }
  }, [backRoute, router, steps])
  return (
    <>
      <Container>
        <Head>
          <title>{windowTitle}</title>
        </Head>
        <header>
          <div>
            <h1>
              <FiFilePlus size={25} /> {title}
            </h1>
          </div>
        </header>
        <Stepper steps={steps}></Stepper>
        <Card>
          {loading && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: '20px'
              }}
            >
              <Spinner size={70}></Spinner>
            </div>
          )}
          {!loading && (
            <>
              {getSelected(steps).name === infoName && (
                <InfoStep
                  onPrevious={back}
                  onNext={file => {
                    setFile(file)
                    next()
                  }}
                  columns={columns}
                  enums={enums}
                  examples={examples}
                ></InfoStep>
              )}
              {getSelected(steps).name === downloadName && (
                <DownloadStep
                  columns={columns}
                  enums={enums}
                  onPrevious={back}
                  onNext={next}
                ></DownloadStep>
              )}
              {getSelected(steps).name === importName && (
                <ImportStep
                  createSchema={createSchema}
                  title={title}
                  enums={enums}
                  extraParams={extraBody}
                  onPrevious={back}
                  onNext={next}
                  file={file}
                  sendURL={sendURL}
                  columns={columns}
                ></ImportStep>
              )}
            </>
          )}
        </Card>
      </Container>
    </>
  )
}

export default Import

import {
  Alert,
  Button,
  Modal,
  Table,
  TableRow,
  NoDataContainer,
  HeaderModal,
  MainModal,
  ScrollWrapper
} from '@components'
import { Search } from '@components/search'
import { useDebounce } from '@utils'
import { useCallback, useState, useRef } from 'react'
import { FiCheck, FiInfo } from 'react-icons/fi'

import { list as variableList } from './list'

interface Props {
  openModal: boolean
  addVariable: (value: string) => void
  onClose: () => void
}

export const VariableModal: React.FC<Props> = ({
  openModal,
  addVariable,
  onClose
}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [list, setList] = useState(variableList)

  const handleClose = useCallback(() => {
    setList(variableList)
    onClose()
  }, [onClose])

  const { run } = useDebounce<string>(filter => {
    setList(
      variableList.filter(({ name }) => name.toUpperCase().includes(filter))
    )
  })

  return (
    <Modal size="xl" open={openModal} onClose={handleClose}>
      <HeaderModal>
        <h2>Selecione uma Tag</h2>
        <Search
          ref={inputRef}
          placeholder="Buscar por alguma Tag"
          onChangeCapture={() => {
            run(inputRef.current?.value.toUpperCase())
          }}
        />
      </HeaderModal>
      <ScrollWrapper>
        <MainModal noPadding>
          <Table>
            <tbody>
              {list.map(v => (
                <tr key={v.value} onClick={() => addVariable(v.value)}>
                  <td>
                    <small>{v.name}</small>
                    <br />
                    <small>{v.value}</small>
                  </td>
                  <td>
                    <Alert size="sm" icon={FiInfo}>
                      <small>
                        {v.description}.<br />
                        Ex.: <b>{v.example}</b>
                      </small>
                    </Alert>
                  </td>
                  <td>
                    <TableRow>
                      <Button
                        inline
                        ghost
                        square
                        color="success"
                        size="small"
                        type="button"
                      >
                        <FiCheck size={20} />
                        <span>Inserir</span>
                      </Button>
                    </TableRow>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {list.length === 0 && (
            <NoDataContainer>
              <span>Nenhum resultado foi encontrado</span>
            </NoDataContainer>
          )}
        </MainModal>
      </ScrollWrapper>
    </Modal>
  )
}

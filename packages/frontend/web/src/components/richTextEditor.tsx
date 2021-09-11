// import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js'
// import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
import { useCallback, useEffect, useState } from 'react'
import { FiType, FiPlus } from 'react-icons/fi'

import Button from '../components/button'
import { Container, Label } from '../styles/components/richTextEditor'
import { useDebounce } from '../utils/debounce'
import Editor from './editor'

// const AddVariable: React.FC<{
//   editorState: any
//   onChange: (data: any) => void
//   onClick: () => void
// }> = ({ editorState, onChange, onClick }) => {
//   const add = (): void => {
//     const contentState = Modifier.replaceText(
//       editorState.getCurrentContent(),
//       editorState.getSelection(),
//       '⭐',
//       editorState.getCurrentInlineStyle()
//     )
//     onChange(EditorState.push(editorState, contentState, 'insert-characters'))
//   }

//   return (
//     <>
//       <Button
//         inline
//         size="small"
//         color="success"
//         onClick={() => {
//           onClick()
//         }}
//         type="button"
//       >
//         <FiPlus size={20} />
//         <span>Adicionar Variável</span>
//       </Button>
//     </>
//   )
// }

interface Props {
  label?: string
  onChange: ({ html: string }) => void
  initialHTMLValue?: string
  // handleAddVariable: (state: EditorState) => void
}

const RichTextEditor: React.FC<Props> = ({
  label,
  onChange,
  initialHTMLValue
  // handleAddVariable
}) => {
  const [showEditor, setShowEditor] = useState(false)
  useEffect(() => {
    if (window) {
      setShowEditor(true)
    }
  }, [])
  const { run } = useDebounce<string>(html => {
    onChange({ html })
  }, 500)
  const onChangeEditor = useCallback(
    data => {
      run(data.html)
    },
    [run]
  )
  console.log(showEditor)

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {/* {showEditor && (
        <Editor
          // onClickAddVariable={state => handleAddVariable(state)}
          initialHTMLValue={initialHTMLValue}
          onChange={onChangeEditor}
        />
      )} */}
    </Container>
  )
}

export default RichTextEditor

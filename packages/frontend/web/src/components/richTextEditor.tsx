import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js'
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

const AddVariable: React.FC<{
  editorState: any
  onChange: (data: any) => void
  onClick: ({ onChange: any }) => void
}> = ({ editorState, onChange, onClick }) => {
  return (
    <>
      <Button
        inline
        size="small"
        color="success"
        onClick={() => {
          onClick({ onChange: onChange })
        }}
        type="button"
      >
        <FiPlus size={20} />
        <span>Inserir Tag</span>
      </Button>
    </>
  )
}

interface Props {
  label?: string
  onChange: ({ html: string }) => void
  initialHTMLValue?: string
  handleAddVariable: ({ state: EditorState, onChange: any }) => void
}

const RichTextEditor: React.FC<Props> = ({
  label,
  onChange,
  initialHTMLValue
  // handleAddVariable
}) => {
  const [draftToHtml, setDraftToHtml] = useState({ draftToHtml: null })
  const [htmlToDraft, setHtmlToDraft] = useState({ htmlToDraft: null })

  const load = async () => {
    const { default: htmlToDraft } = await import('html-to-draftjs')
    const { default: draftToHtml } = await import('draftjs-to-html')

    setHtmlToDraft({ htmlToDraft: htmlToDraft })
    setDraftToHtml({ draftToHtml: draftToHtml })
  }

  const { run } = useDebounce<string>(html => {
    onChange({ html })
  }, 500)
  const onChangeEditor = useCallback(
    data => {
      run(data.html)
    },
    [run]
  )

  useEffect(() => {
    if (window && !draftToHtml.draftToHtml && !htmlToDraft.htmlToDraft) load()
  }, [draftToHtml.draftToHtml, htmlToDraft.htmlToDraft])

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {draftToHtml.draftToHtml && htmlToDraft.htmlToDraft && (
        <EditorComp
          draftToHtml={draftToHtml.draftToHtml}
          htmlToDraft={htmlToDraft.htmlToDraft}
          onClickAddVariable={state => handleAddVariable(state)}
          initialHTMLValue={initialHTMLValue}
          onChange={onChangeEditor}
        ></EditorComp>
      )}
    </Container>
  )
}

const EditorComp: React.FC<{
  onChange: ({ html: string, state: any }) => void
  initialHTMLValue: string
  onClickAddVariable: ({ state: EditorState, onChange: any }) => void
  draftToHtml: any
  htmlToDraft: any
}> = ({
  onChange,
  initialHTMLValue,
  onClickAddVariable,
  draftToHtml,
  htmlToDraft
}) => {
  const [Editor, setEditor] = useState(null)

  const [editoState, setEditoState] = useState(
    initialHTMLValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(initialHTMLValue).contentBlocks
          )
        )
      : EditorState.createEmpty()
  )

  useEffect(() => {
    if (window) {
      const load = async () => {
        setEditor({
          Component: (await import('react-draft-wysiwyg')).Editor
        })
      }
      load()
    }
  }, [htmlToDraft, initialHTMLValue])

  const onEditorStateChange = useCallback(
    state => {
      const htmlState: string = draftToHtml(
        convertToRaw(state.getCurrentContent())
      ).replaceAll(/<p><\/p>/g, '<p>&nbsp;</p>')
      setEditoState(state)
      onChange({ html: htmlState, state: state })
    },
    [draftToHtml, onChange]
  )
  return (
    <>
      {Editor && (
        <Editor.Component
          toolbarCustomButtons={[
            <AddVariable
              onClick={({ onChange }) =>
                onClickAddVariable({
                  state: editoState,
                  onChange: onChange
                })
              }
              onChange={() => {
                console.log()
              }}
              key="1"
              editorState={editoState}
            />
          ]}
          hashtag={{
            separator: ' ',
            trigger: '#'
          }}
          editorClassName="editor-class"
          toolbar={opt}
          editorState={editoState}
          onEditorStateChange={onEditorStateChange}
        />
      )} */}
    </Container>
  )
}

export default RichTextEditor

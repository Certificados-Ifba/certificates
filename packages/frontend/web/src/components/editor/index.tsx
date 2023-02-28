import { VariableModal } from '@components'
import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js'
import { useCallback, useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'

import { options } from './options'
import { AddTagButton } from './styles'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

interface Props {
  onChange: ({ html: string, state: any }) => void
  initialHTMLValue: string
  draftToHtml: any
  htmlToDraft: any
}

export const Editor: React.FC<Props> = ({
  onChange,
  initialHTMLValue,
  draftToHtml,
  htmlToDraft
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [Editor, setEditor] = useState(null)
  const [editorState, setEditorState] = useState(
    initialHTMLValue
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            htmlToDraft(initialHTMLValue).contentBlocks
          )
        )
      : EditorState.createEmpty()
  )

  const handleOpen = useCallback(() => {
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

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
      setEditorState(state)
      onChange({ html: htmlState, state: state })
    },
    [draftToHtml, onChange]
  )

  const addVariable = useCallback(
    (value: string) => {
      const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        value,
        editorState.getCurrentInlineStyle()
      )
      setEditorState(
        EditorState.push(editorState, contentState, 'insert-characters')
      )
      handleClose()
    },
    [handleClose, editorState]
  )

  return (
    <>
      {Editor && (
        <Editor.Component
          editorClassName="editor-class"
          toolbar={options}
          editorState={editorState}
          onEditorStateChange={onEditorStateChange}
          toolbarCustomButtons={[
            <AddTagButton key="button-tag" className="rdw-history-wrapper">
              <button
                onClick={handleOpen}
                type="button"
                className="rdw-option-wrapper"
              >
                <FiPlus size={16} />
                <span>Inserir Tag</span>
              </button>
            </AddTagButton>
          ]}
          hashtag={{
            separator: ' ',
            trigger: '#'
          }}
        />
      )}
      <VariableModal
        addVariable={addVariable}
        openModal={isOpen}
        onClose={handleClose}
      />
    </>
  )
}

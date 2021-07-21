import { ContentState, convertToRaw, EditorState, Modifier } from 'draft-js'
import { useCallback, useEffect, useState } from 'react'
import { FiType, FiPlus } from 'react-icons/fi'

import Button from '../components/button'
import { Container, Label } from '../styles/components/richTextEditor'
import { useDebounce } from '../utils/debounce'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

const opt = {
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'emoji',
    'remove',
    'history'
  ],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough']
  },
  blockType: {
    inDropdown: true,
    options: [
      'Normal',
      'H1',
      'H2',
      'H3',
      'H4',
      'H5',
      'H6',
      'Blockquote',
      'Code'
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontSize: {
    icon: FiType,
    options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  fontFamily: {
    options: [
      'Arial',
      'Georgia',
      'Impact',
      'Tahoma',
      'Times New Roman',
      'Verdana'
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered', 'indent', 'outdent']
  },
  textAlign: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['left', 'center', 'right', 'justify']
  },
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    colors: [
      'rgb(97,189,109)',
      'rgb(26,188,156)',
      'rgb(84,172,210)',
      'rgb(44,130,201)',
      'rgb(147,101,184)',
      'rgb(71,85,119)',
      'rgb(204,204,204)',
      'rgb(65,168,95)',
      'rgb(0,168,133)',
      'rgb(61,142,185)',
      'rgb(41,105,176)',
      'rgb(85,57,130)',
      'rgb(40,50,78)',
      'rgb(0,0,0)',
      'rgb(247,218,100)',
      'rgb(251,160,38)',
      'rgb(235,107,86)',
      'rgb(226,80,65)',
      'rgb(163,143,132)',
      'rgb(239,239,239)',
      'rgb(255,255,255)',
      'rgb(250,197,28)',
      'rgb(243,121,52)',
      'rgb(209,72,65)',
      'rgb(184,49,47)',
      'rgb(124,112,107)',
      'rgb(209,213,216)'
    ]
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    linkCallback: undefined
  },
  emoji: {
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    emojis: [
      '😀',
      '😁',
      '😂',
      '😃',
      '😉',
      '😋',
      '😎',
      '😍',
      '😗',
      '🤗',
      '🤔',
      '😣',
      '😫',
      '😴',
      '😌',
      '🤓',
      '😛',
      '😜',
      '😠',
      '😇',
      '😷',
      '😈',
      '👻',
      '😺',
      '😸',
      '😹',
      '😻',
      '😼',
      '😽',
      '🙀',
      '🙈',
      '🙉',
      '🙊',
      '👼',
      '👮',
      '🕵',
      '💂',
      '👳',
      '🎅',
      '👸',
      '👰',
      '👲',
      '🙍',
      '🙇',
      '🚶',
      '🏃',
      '💃',
      '⛷',
      '🏂',
      '🏌',
      '🏄',
      '🚣',
      '🏊',
      '⛹',
      '🏋',
      '🚴',
      '👫',
      '💪',
      '👈',
      '👉',
      '👉',
      '👆',
      '🖕',
      '👇',
      '🖖',
      '🤘',
      '🖐',
      '👌',
      '👍',
      '👎',
      '✊',
      '👊',
      '👏',
      '🙌',
      '🙏',
      '🐵',
      '🐶',
      '🐇',
      '🐥',
      '🐸',
      '🐌',
      '🐛',
      '🐜',
      '🐝',
      '🍉',
      '🍄',
      '🍔',
      '🍤',
      '🍨',
      '🍪',
      '🎂',
      '🍰',
      '🍾',
      '🍷',
      '🍸',
      '🍺',
      '🌍',
      '🚑',
      '⏰',
      '🌙',
      '🌝',
      '🌞',
      '⭐',
      '🌟',
      '🌠',
      '🌨',
      '🌩',
      '⛄',
      '🔥',
      '🎄',
      '🎈',
      '🎉',
      '🎊',
      '🎁',
      '🎗',
      '🏀',
      '🏈',
      '🎲',
      '🔇',
      '🔈',
      '📣',
      '🔔',
      '🎵',
      '🎷',
      '💰',
      '🖊',
      '📅',
      '✅',
      '❎',
      '💯'
    ]
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo']
  }
}

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
  initialHTMLValue,
  handleAddVariable
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
      )}
    </>
  )
}

export default RichTextEditor

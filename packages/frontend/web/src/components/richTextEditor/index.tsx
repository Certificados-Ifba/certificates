import { Editor } from '@components'
import { Input } from '@components/input'
import { useDebounce } from '@utils'
import { useCallback, useEffect, useState } from 'react'

import { Container, Label } from './styles'

interface Props {
  name?: string
  label?: string
  onChange: ({ html: string }) => void
  initialHTMLValue?: string
}

export const RichTextEditor: React.FC<Props> = ({
  name,
  label,
  onChange,
  initialHTMLValue
}) => {
  const [html, setHtml] = useState(initialHTMLValue)
  const [draftToHtml, setDraftToHtml] = useState({ draftToHtml: null })
  const [htmlToDraft, setHtmlToDraft] = useState({ htmlToDraft: null })

  const onLoad = async () => {
    const { default: htmlToDraft } = await import('html-to-draftjs')
    const { default: draftToHtml } = await import('draftjs-to-html')

    setHtmlToDraft({ htmlToDraft: htmlToDraft })
    setDraftToHtml({ draftToHtml: draftToHtml })
  }

  const { run } = useDebounce<string>(html => {
    setHtml(html)
    onChange({ html })
  }, 500)

  const onChangeEditor = useCallback(
    data => {
      run(data.html)
    },
    [run]
  )

  useEffect(() => {
    if (window && !draftToHtml.draftToHtml && !htmlToDraft.htmlToDraft) onLoad()
  }, [draftToHtml.draftToHtml, htmlToDraft.htmlToDraft])

  return (
    <Container>
      {label && <Label>{label}</Label>}
      {draftToHtml.draftToHtml && htmlToDraft.htmlToDraft && (
        <Editor
          draftToHtml={draftToHtml.draftToHtml}
          htmlToDraft={htmlToDraft.htmlToDraft}
          initialHTMLValue={initialHTMLValue}
          onChange={onChangeEditor}
        />
      )}
      {name && <Input name={name} value={html} hidden />}
    </Container>
  )
}

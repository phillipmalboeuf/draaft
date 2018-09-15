
import * as React from 'react'
import { PureComponent } from 'react'


import Quill, { Delta } from 'quill'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {
  onChange?: (delta: Delta)=> void
}
interface State {}

@withDBContext
export class Editor extends React.PureComponent<Props, State> {

  public element: HTMLDivElement
  private editor: Quill


  componentDidMount() {
    this.editor = new Quill(this.element, {
      theme: 'snow',
      modules: {
        toolbar: [['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }], ['code-block', 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image'], ['clean']]
      }
    })
    this.editor.on('text-change', e => this.props.onChange && this.props.onChange(this.editor.getContents()))


    this.props.context.db.collection('drafts').doc('test').get().then(doc => this.editor.setContents(doc.data().delta.ops, 'silent'))
  }

  public render() {
    return <div ref={element => this.element = element} />
  }
}

import * as React from 'react'
import { PureComponent } from 'react'


import Quill, { Delta } from 'quill'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {
  delta?: Delta,
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
    this.props.delta && this.editor.setContents(this.props.delta, 'silent')
  }

  public render() {
    return <div ref={element => this.element = element} />
  }
}
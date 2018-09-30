
import * as React from 'react'
import Quill, { Delta, TextChangeHandler } from 'quill'

import { storage, auth } from '../clients/firebase'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {
  delta?: Delta,
  onChange?: (delta: Delta)=> void,
  placeholder?: string,
  readOnly?: boolean
}
interface State {}

@withDBContext
export class Editor extends React.PureComponent<Props, State> {

  public toolbar: HTMLDivElement
  public element: HTMLDivElement
  private handler: TextChangeHandler
  private editor: Quill


  componentDidMount() {
    this.editor = new Quill(this.element, {
      theme: 'snow',
      modules: this.props.readOnly ? { toolbar: null } : {
        toolbar: {
          container: [['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }], ['code-block', 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image'], ['clean']],
          handlers: {
            image: this.image.bind(this)
          }
        }
      },
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder || '...',
    })
    this.handler = ()=> this.props.onChange && this.props.onChange(this.editor.getContents())
    this.editor.on('text-change', this.handler)
    this.props.delta && this.editor.setContents(this.props.delta, 'silent')
  }

  componentWillUnmount() {
    this.editor.off('text-change', this.handler)
    delete this.editor
  }

  public image() {
    let input = document.createElement('input')
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'image/*')
    input.click()
    input.onchange = ()=> this.upload(input.files[0])
  }

  public upload(file: File) {
    let ref = storage.ref(`${auth.currentUser.uid}/images/${file.name}`)
    ref.put(file)
      .then(snapshot => ref.getDownloadURL())
      .then(url => this.editor.insertEmbed(this.editor.getSelection().index, 'image', url))
  }

  public render() {
    return <div>
      <div ref={element => this.element = element} />
    </div>
  }
}

import * as React from 'react'
import Quill, { Delta, TextChangeHandler, SelectionChangeHandler } from 'quill'

import { storage, auth } from '../clients/firebase'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {
  delta?: Delta,
  onChange?: (delta: Delta)=> void,
  placeholder?: string,
  readOnly?: boolean,
  alternate?: boolean
}
interface State {}

@withDBContext
export class Editor extends React.PureComponent<Props, State> {

  public container: HTMLDivElement
  public element: HTMLDivElement
  private editor: Quill


  componentDidMount() {
    this.editor = new Quill(this.element, {
      theme: 'snow',
      modules: this.props.readOnly ? { toolbar: null } : {
        toolbar: {
          container: [['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }], ['code-block', 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }], ['clean']],
          handlers: {
            image: this.image.bind(this)
          }
        }
      },
      readOnly: this.props.readOnly,
      placeholder: this.props.placeholder || '...',
    })
    this.change = this.change.bind(this)
    this.select = this.select.bind(this)
    this.editor.on('text-change', this.change)
    !this.props.readOnly && this.editor.on('selection-change', this.select)
    this.props.delta && this.editor.setContents(this.props.delta, 'silent')
  }

  componentWillUnmount() {
    this.editor.off('text-change', this.change)
    !this.props.readOnly && this.editor.off('selection-change', this.select)
    delete this.editor
  }

  private change() {
    this.props.onChange && this.props.onChange(this.editor.getContents())
  }

  private select(range: { index: number, length: number }) {
    let toolbar = this.container.getElementsByClassName('ql-toolbar')[0]
    if (range && range.length > 0) {
      let bounds = this.editor.getBounds(range.index, range.length)
      toolbar.classList.add('toolbar--show')
      toolbar.setAttribute('style', `top:${bounds.top}px;left:${bounds.left+(bounds.right-bounds.left/2)}px;`);
    } else {
      toolbar.classList.remove('toolbar--show')
    }
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
    return <div className={`editor${this.props.alternate ? ' editor--alternate' : ''}`} ref={element => this.container = element}>
      <div ref={element => this.element = element} />
    </div>
  }
}

import * as React from 'react'

import Quill, { Delta, TextChangeHandler } from 'quill'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {
  delta?: Delta,
  onChange?: (delta: Delta)=> void
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
      modules: {
        toolbar: {
          container: this.toolbar,
          // container: [['bold', 'italic', 'underline', 'strike'], [{ 'align': [] }, { 'indent': '-1'}, { 'indent': '+1' }], ['code-block', 'blockquote', { 'list': 'ordered'}, { 'list': 'bullet' }], ['link', 'image'], ['clean']]
        }
      }
    })
    this.handler = ()=> this.props.onChange && this.props.onChange(this.editor.getContents())
    this.editor.on('text-change', this.handler)
    this.props.delta && this.editor.setContents(this.props.delta, 'silent')
  }

  componentWillUnmount() {
    this.editor.off('text-change', this.handler)
  }

  public render() {
    return <>
      <div ref={element => this.toolbar = element}>
        <span className='ql-formats'>
          <button className='ql-bold' />
          <button className='ql-italic' />
          <button className='ql-underline' />
          <button className='ql-strike' />
        </span>
      
      </div>
      <div ref={element => this.element = element} />
    </>
  }
}
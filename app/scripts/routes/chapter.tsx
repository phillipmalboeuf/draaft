
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Chapter } from '../models/chapter'
import { Form, Input } from '../components/form'
import { Editor } from '../components/editor'
import { Button } from '../components/button'


type Props = DBContextProps & AuthContextProps & RouteComponentProps<any>
type State = {
  chapter: any
}

@withDBContext
@withAuthContext
export class ChapterEditor extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      chapter: null
    }
  }


  componentDidMount() {
    this.fetchChapter()
  }

  public fetchChapter() {
    return Chapter.get(this.props.match.params.id).then(chapter => this.setState({ chapter }))
  }

  public render() {
    return this.state.chapter && <>
      <h1>{this.state.chapter.title}</h1>
      
      {this.props.context.user && this.props.context.user.uid == this.state.chapter.user
        ? <>
          <Form id='chapter' model={Chapter} modelId={this.state.chapter.id} values={this.state.chapter} onSubmit={()=> this.fetchChapter()}>
            <Input name='title' label='Chapter Title' /><br />
            <Input name='contents' type='editor' />
          </Form>

          {this.state.chapter.public 
          ? <Button label='Unpublish Chapter' onClick={()=> Chapter.update(this.state.chapter.id, { public: false }).then(()=> this.fetchChapter())} />
          : <Button label='Publish Chapter' onClick={()=> Chapter.update(this.state.chapter.id, { public: true }).then(()=> this.fetchChapter())} />}
        </>
        : <Editor readOnly delta={this.state.chapter.contents} />}
    </>
  }
}
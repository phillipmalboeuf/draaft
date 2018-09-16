
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { Chapter } from '../models/chapter'
import { Form, Input } from '../components/form'


interface Props extends DBContextProps {}
interface State {
  chapter: any
}

@withDBContext
export class ChapterEditor extends React.PureComponent<Props & RouteComponentProps<any>, State> {

  constructor(props: Props & RouteComponentProps<any>) {
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
      <Form id='chapter' collection='chapters' doc={this.state.chapter.id} values={this.state.chapter} onSubmit={()=> this.fetchChapter()}>
        <Input name='title' label='Chapter Title' /><br />
        <Input name='contents' type='editor' />
      </Form>
    </>
  }
}
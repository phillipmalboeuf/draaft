
import * as React from 'react'
import { Link } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapter } from '../models/chapter'
import { Form, Input } from '../components/form'



interface Props extends DBContextProps {}
interface State {
  chapters: any[]
}

@withDBContext
@withAuthContext
export class Chapters extends React.PureComponent<Props & AuthContextProps, State> {

  constructor(props: Props & AuthContextProps) {
    super(props)
    this.state = {
      chapters: null
    }
  }


  componentDidMount() {
    this.fetchChapters()
  }

  public fetchChapters() {
    return Chapter.list().then(chapters => this.setState({ chapters }))
  }

  public render() {
    return <>
      {this.props.context.user && <Form id='new_chapter' collection='chapters' cta='Create' onSubmit={()=> this.fetchChapters()}>
        <Input name='title' label='Start a new chapter' />
      </Form>}
      <ol>
        {this.state.chapters && this.state.chapters.map(chapter => <li key={chapter.id}>
          <Link to={`/chapters/${chapter.id}`}>{chapter.title}</Link>
        </li>)}
      </ol>
    </>
  }
}
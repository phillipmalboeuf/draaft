
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Chapter } from '../models/chapter'
import { Form, Input } from '../components/form'
import { Editor } from '../components/editor'
import { Button } from '../components/button'
import { Grid, Col, Quarter, ThreeQuarters } from '../components/grid'


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
      
      {this.props.context.user && this.props.context.user.uid == this.state.chapter.user
        ?< Form id='chapter' autosave model={Chapter} modelId={this.state.chapter.id} values={this.state.chapter} onSubmit={()=> this.fetchChapter()}>
          <Grid guttered>
            <ThreeQuarters>
              <Input name='date' alternate label='An associated date' />
              <Input name='title' alternate label='Chapter Title' /><br />
              <Input name='contents' type='editor' placeholder='I was standing in the rain...' />
            </ThreeQuarters>
            <Quarter>
              {this.state.chapter.public 
              ? <Button label='Unpublish Chapter' onClick={()=> Chapter.update(this.state.chapter.id, { public: false }).then(()=> this.fetchChapter())} />
              : <Button label='Publish Chapter' onClick={()=> Chapter.update(this.state.chapter.id, { public: true }).then(()=> this.fetchChapter())} />}
            </Quarter>
          </Grid>
        </Form> 
        : <Grid guttered>
          <ThreeQuarters>
            <h1>{this.state.chapter.title}</h1>
            <Editor readOnly delta={this.state.chapter.contents} />
          </ThreeQuarters>

          <Quarter>
            <p>
              <Link to={`/people/${this.state.chapter.user}`} className='underline'>{this.state.chapter.by}</Link><br />
              {this.state.chapter.date}
            </p>
          </Quarter>
        </Grid>}
    </>
  }
}

import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Note } from '../models/note'

import { Form, Input } from '../components/form'
import { Editor } from '../components/editor'
import { Button } from '../components/button'
import { Grid, Col, Quarter, ThreeQuarters } from '../components/grid'



type Props = DBContextProps & AuthContextProps & RouteComponentProps<any>
type State = {
  note: any
}

@withDBContext
@withAuthContext
export class NoteReader extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      note: null
    }
  }


  componentDidMount() {
    this.fetchNote()
  }

  public fetchNote() {
    return Note.get(this.props.match.params.id).then(note => this.setState({ note }))
  }

  public render() {
    return this.state.note && <>
      
      {this.props.context.user && <Grid guttered>
        <ThreeQuarters>
          <p><Link to='/notes' className='underline'>Back to notes</Link></p>
          <strong>From {this.state.note.from === this.props.context.auth.currentUser.uid ? 'me' : this.state.note.from} to {this.state.note.to === this.props.context.auth.currentUser.uid ? 'me' : this.state.note.to}</strong>
          <h1>{this.state.note.subject}</h1>
          <Editor readOnly delta={this.state.note.contents} />
          <p><em>{this.state.note.signature}</em></p>

          <Link to={`/new_note?to=${this.state.note.from === this.props.context.auth.currentUser.uid ? this.state.note.to : this.state.note.from}`} className='underline'>{this.state.note.from === this.props.context.auth.currentUser.uid ? 'Send another note' : 'Write a reply'}</Link>
        </ThreeQuarters>

        <Quarter>
          
        </Quarter>
      </Grid>}
    </>
  }
}
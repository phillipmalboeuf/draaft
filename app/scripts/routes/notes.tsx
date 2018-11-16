
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Note } from '../models/note'

import { Form, Input } from '../components/form'
import { Editor } from '../components/editor'
import { Button } from '../components/button'
import { Grid, Col, Quarter, TwoThirds, ThreeQuarters } from '../components/grid'



type Props = DBContextProps & AuthContextProps & {
  empty?: JSX.Element
}
type State = {
  notes: any[],
}

@withDBContext
@withAuthContext
export class Notes extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      notes: null
    }
  }


  componentDidMount() {
    if (this.props.context.user !== undefined) {
      this.fetchNotes()
    }
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.context.user === undefined && this.props.context.user !== undefined) {
      this.fetchNotes()
    }
  }

  public fetchNotes() {
    return Note.list([['correspondents', 'array-contains', this.props.context.user.uid]]).then(notes => this.setState({ notes }))
  }

  public render() {
    return this.state.notes && (this.state.notes.length > 0
      ? this.state.notes.map(note => <div className='medium_bottom' key={note.id}>
        <Grid guttered spaced>
          <Col size='1of12'>
            {note.to}
          </Col>
          <TwoThirds>
            <Link className='slight' to={`/notes/${note.id}`}>
              <p>
                {note.subject}
              </p>
            </Link>
          </TwoThirds>
          <Col size='1of12'>{note.date}</Col>
        </Grid>
      </div>)
      : this.props.empty || <em>No notes yet...</em>)
  }
}
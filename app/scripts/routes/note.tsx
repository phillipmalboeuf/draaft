
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
          <h1>{this.state.note.subject}</h1>
          <Editor readOnly delta={this.state.note.contents} />
          <em>{this.state.note.signature}</em>
        </ThreeQuarters>

        <Quarter>
          
        </Quarter>
      </Grid>}
    </>
  }
}
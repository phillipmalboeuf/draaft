
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
  stacks: {
    correspondent: string,
    notes: any[]
  }[]
}

@withDBContext
@withAuthContext
export class Notes extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      stacks: null
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
    Promise.all([
      Note.list([['from', '==', this.props.context.user.uid]]),
      Note.list([['to', '==', this.props.context.user.uid]])
    ]).then(([from, to]) => {
      let stacks = {} as {[key: string]: any[]}
      from.forEach(note => {
        if (!stacks[note.to]) { stacks[note.to] = [] }
        stacks[note.to].push(note)
      })

      to.forEach(note => {
        if (!stacks[note.from]) { stacks[note.from] = [] }
        stacks[note.from].push(note)
      })

      this.setState({ stacks: Object.keys(stacks).map(id => ({
        correspondent: id,
        notes: stacks[id]
      })) })
    })
  }

  public render() {
    return this.state.stacks && (this.state.stacks.length > 0
      ? this.state.stacks.map(stack => <div className='medium_bottom' key={stack.correspondent}>
        <Grid guttered spaced>
          <Col size='2of12 col--scroll'>
            <Link to={`/people/${stack.correspondent}`}>{stack.correspondent}</Link>
          </Col>
          <TwoThirds>
            {stack.notes.map(note => <Link className='slight' to={`/notes/${note.id}`}>
              <p>
                {note.subject}
              </p>
            </Link>)}
          </TwoThirds>
          <Col size='1of12'>{stack.notes[stack.notes.length - 1].date}</Col>
        </Grid>
      </div>)
      : this.props.empty || <em>No notes yet...</em>)
  }
}
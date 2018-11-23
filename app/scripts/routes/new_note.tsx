
import * as React from 'react'
import { Link, Redirect, RouteComponentProps } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Note } from '../models/note'
import { auth } from '../clients/firebase'
import { People } from '../models/people'


type Props = AuthContextProps & RouteComponentProps<any>
type State = {
  person: any
}


@withAuthContext
export class NewNote extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      person: null
    }
  }

  componentDidMount() {
    this.fetchPerson()
  }

  public fetchPerson() {
    People.get(new URLSearchParams(this.props.location.search).get('to')).then(person => this.setState({ person }))
  }

  public render() {
    return <div className='padded bordered max_width'>
      {this.props.context.user && this.state.person && <Form id='new_note' model={Note} values={{
        from: this.props.context.user.uid, 
        to: this.state.person.id
      }} cta='Send'>
        {/* <Input disabled alternate name='to' label='To' /> */}
        <label className='label--alternate'>To:</label> <div className='input input--alternate input--disabled'>{this.state.person && this.state.person.email}</div>
        <Input alternate name='subject' label='Subject line' placeholder='Regarding your latest chapter' />
        <Input alternate name='contents' type='editor' label='Note' placeholder={`I'd like to share my toughts on...`} />
        <Input alternate name='signature' label='Signature' placeholder='From an admirer' />
      </Form>}
    </div>
  }
}


import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Note } from '../models/note'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class NewNote extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      {this.props.context.user && <Form id='new_note' model={Note} values={{
        user: this.props.context.user.uid
      }} cta='Send'>
        <Input name='subject' label='Subject line' />
        <Input name='contents' type='editor' label='Note' />
        <Input name='signature' label='Signature' />
      </Form>}
    </div>
  }
}

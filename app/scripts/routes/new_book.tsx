
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapter } from '../models/chapter'
import { Book } from '../models/book'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class NewBook extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      {this.props.context.user && <Form id='new_book' model={Book} values={{
        user: this.props.context.user.uid,
        by: this.props.context.user.displayName
      }} cta='Create'>
        <Input name='title' label='Start a new book' />
      </Form>}
    </div>
  }
}

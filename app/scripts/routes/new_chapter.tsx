
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapter } from '../models/chapter'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class NewChapter extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      {this.props.context.user && <Form id='new_chapter' model={Chapter} values={{user: this.props.context.user.uid}} cta='Create'>
        <Input name='title' label='Start a new chapter' />
      </Form>}
    </div>
  }
}

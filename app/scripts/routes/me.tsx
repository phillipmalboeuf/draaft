
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PureComponent } from 'react'


import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Form, Input } from '../components/form'
import { Button } from '../components/button'
import { Chapters } from './chapters'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Me extends React.PureComponent<Props, State> {

  public render() {
    return this.props.context.user
    ? <>
      <h1>Hi {this.props.context.user.email}</h1>
      <Chapters filters={[['user', '==', this.props.context.user.uid]]} />

      <Button to='/logout' label='Logout' />
    </>
    : null
  }
}
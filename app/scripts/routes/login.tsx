
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'
import { PureComponent } from 'react'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Login extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      <h1>Login</h1>
      <Link to='/signup'>Don't yet have an account?</Link><br />
      <Form id='login' onSubmit={values => this.props.context.auth.signInWithEmailAndPassword(values.email, values.password)}>
        <Input type='email' name='email' label='Email address' placeholder='you@gmail.com' /><br />
        <Input type='password' name='password' label='Password' placeholder='********' /><br />
      </Form>

      {this.props.context.user && <Redirect to={`/me`} />}
    </div>
  }
}


@withAuthContext
export class Logout extends React.PureComponent<Props, State> {

  componentDidMount() {
    this.props.context.auth.signOut()
  }

  public render() {
    return <div>
      <h1>Loging out...</h1>
      {!this.props.context.user && <Redirect to='/' />}
    </div>
  }
}
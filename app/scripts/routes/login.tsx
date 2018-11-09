
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Login extends React.PureComponent<Props, State> {

  public render() {
    return <div className='max_width text_center'>
      <h1 className='padded'>Get some writing done.</h1>
      
      <Form id='login' cta='Login' onSubmit={values => this.props.context.auth.signInWithEmailAndPassword(values.email, values.password)} redirect='/me'>
        <Input type='email' name='email' label='Email address' placeholder='you@gmail.com' /><br />
        <Input type='password' name='password' label='Password' placeholder='********' /><br />
      </Form>

      Not a member? <Link to='/signup' className='underline'>Create an account</Link>
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
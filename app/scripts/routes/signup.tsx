
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Signup extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      <h1>Signup</h1>
      <Link to='/login'>Already have an account?</Link><br />
      <Form id='signup' cta='Signup' onSubmit={values => this.props.context.auth.createUserWithEmailAndPassword(values.email, values.password)} redirect='/me'>
        {/* <Input name='displayName' label='Display name' placeholder='isaac' /><br /> */}
        <Input type='email' name='email' label='Email address' placeholder='you@gmail.com' /><br />
        <Input type='password' name='password' label='New password' placeholder='********' autoComplete='new-password' /><br />
      </Form>
    </div>
  }
}

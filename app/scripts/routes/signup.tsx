
import * as React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Signup extends React.PureComponent<Props, State> {

  public render() {
    return <div className='max_width text_center'>
      <h1 className='padded'>Draaft is a platform for writing your life stories.</h1>

      <Form id='signup' cta='Signup' onSubmit={values => this.props.context.auth.createUserWithEmailAndPassword(values.email, values.password).then(auth => auth.user.updateProfile({ displayName: values.displayName, photoURL: undefined }))} redirect='/me'>
        <Input name='displayName' label='Display / pen / user name' placeholder='isaac' /><br />
        <Input type='email' name='email' label='Email address' placeholder='you@gmail.com' /><br />
        <Input type='password' name='password' label='New password' placeholder='********' autoComplete='new-password' /><br />
      </Form>

      Already a member? <Link to='/login' className='underline'>Log in</Link>
    </div>
  }
}

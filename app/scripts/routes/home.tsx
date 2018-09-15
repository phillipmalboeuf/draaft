
import * as React from 'react'
import { Link } from 'react-router-dom'

import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapters } from '../components/chapters'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Home extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      <h1>Home</h1>
      {this.props.context.user
        ? <p>Hi <Link to='/me'>{this.props.context.user.email}</Link></p>
        : <>
          <Link to='/login'>Login</Link> / <Link to='/signup'>Create an account</Link>
        </>}

        <Chapters />
    </div>
  }
}
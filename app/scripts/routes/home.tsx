
import * as React from 'react'
import { Link } from 'react-router-dom'

import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapters } from '../routes/chapters'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Home extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      {/* {this.props.context.user
        ? <>
          <p>Hi <Link to='/me'>{this.props.context.user.email}</Link></p>
        </>
        : <>
          <Link to='/login'>Login</Link> / <Link to='/signup'>Create an account</Link>
        </>} */}

        <Chapters filters={[['public', '==', true]]} />
    </div>
  }
}
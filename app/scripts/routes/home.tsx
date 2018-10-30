
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
      <h1 className='text_center big_bottom'>Read stories from the community</h1>

      <Chapters filters={[['public', '==', true]]} />
    </div>
  }
}
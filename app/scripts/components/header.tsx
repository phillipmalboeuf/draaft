import * as React from 'react'
import { Link } from 'react-router-dom'

import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Grid, Col } from './grid'
import { Button } from './button'


interface Props {}
interface State {}

@withAuthContext
export class Header extends React.PureComponent<Props & AuthContextProps, State> {

  constructor(props: Props & AuthContextProps) {
    super(props)
  }

  componentDidMount() {

  }

  public render() {
    return <header>
      <Grid spaced>
        <Col>
          <Link to='/'><strong>Draaft</strong></Link>
        </Col>
        <Col>
          {this.props.context.user
          ? <Button label='+' to='/new_chapter' />
          : <Button label='Sign in' to='/login' />}
        </Col>
      </Grid>
    </header>
  }
}
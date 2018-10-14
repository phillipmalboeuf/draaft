import * as React from 'react'
import { Link } from 'react-router-dom'

import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Grid, Col } from './grid'
import { Button } from './button'
import { Overlay } from './overlay';


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

          &nbsp;&nbsp;&nbsp;

          <Overlay button='•••'>
            <p>Draaft</p>
            <p>Draaft taps into the brains of the world’s most insightful writers, thinkers, and storytellers to bring you the smartest takes on topics that matter.</p>

            {this.props.context.user
            ? <>
              <Link to='/me' className='underline'>Your chapters</Link><br />
              <Link to='/new_chapter' className='underline'>Write a new entry</Link><br />
              <Link to='/logout' className='underline'>Logout</Link><br />
            </>
            : <>
              <Link to='/login' className='underline'>Sign in</Link><br />
              <Link to='/signup' className='underline'>Create an account</Link><br />
            </>}

            <Link to='/about' className='underline'>About</Link><br />
            <Link to='/report' className='underline'>Report a bug</Link>
          </Overlay>
        </Col>
      </Grid>
    </header>
  }
}
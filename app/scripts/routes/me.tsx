
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PureComponent } from 'react'

import { Chapters } from './chapters'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Form, Input } from '../components/form'
import { Button } from '../components/button'
import { Grid, Quarter, TwoThirds, Col, Third } from '../components/grid'
import { People } from '../models/people'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class Me extends React.PureComponent<Props, State> {

  public render() {
    return this.props.context.user
    ? <Chapters filters={[['user', '==', this.props.context.user.uid]]} empty={<div className='max_width text_center'>
      <h1 className='padded'>Think back to a moment in your life you want to write about.</h1>
      <Button to='/new_chapter' label='Write your first chapter' />
      <div className='padded'>Not inspired? <Link to='/' className='underline'>Explore what others are writing about</Link></div>
    </div>} />
    : null
  }
}
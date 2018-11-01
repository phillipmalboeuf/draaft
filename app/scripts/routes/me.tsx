
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
    ? <Grid guttered spaced>
      {/* <h1>Hi {this.props.context.user.email}</h1> */}
      <TwoThirds>
        <Chapters filters={[['user', '==', this.props.context.user.uid]]} />
      </TwoThirds>
      
      <Quarter>
        <Form id='user' onSubmit={(values: { displayName: string, photoURL: string })=> this.props.context.user.updateProfile(values)}>
          <Input name='displayName' label='Display name' />
        </Form>
      </Quarter>
    </Grid>
    : null
  }
}
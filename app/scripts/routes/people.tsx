
import * as React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'

import { Chapters } from './chapters'
import { withAuthContext, AuthContextProps } from '../contexts/auth'

import { Form, Input } from '../components/form'
import { Button } from '../components/button'
import { Grid, Quarter, TwoThirds, Col, Third } from '../components/grid'
import { People } from '../models/people'


type Props = AuthContextProps & RouteComponentProps<any>
type State = {}


@withAuthContext
export class PeopleView extends React.PureComponent<Props, State> {

  public render() {
    return <Chapters filters={[['user', '==', this.props.match.params.id], ['public', '==', true]]} />
  }
}

import * as React from 'react'
import { PureComponent } from 'react'

import { Editor } from './editor'
import { withDBContext, DBContextProps } from '../contexts/db'


interface Props extends DBContextProps {}
interface State {}

@withDBContext
export class App extends React.PureComponent<Props, State> {

  public render() {
    return <div>
      <Editor onChange={delta => this.props.context.db.collection('drafts').doc('test').set({
        delta: { ...delta }
      }) } />
    </div>
  }
}
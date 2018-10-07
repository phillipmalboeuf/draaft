import * as React from 'react'
import { Link } from 'react-router-dom'

import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { withThemeContext, ThemeContextProps } from '../contexts/theme'

import { Grid, Col } from './grid'
import { Button } from './button'
import { Input } from './form'


interface Props {}
interface State {}

@withAuthContext
@withThemeContext
export class Footer extends React.PureComponent<Props & AuthContextProps & ThemeContextProps, State> {

  constructor(props: Props & AuthContextProps & ThemeContextProps) {
    super(props)
  }

  componentDidMount() {

  }

  public render() {
    return <footer>
      <Grid spaced>
        <Col>
          <Link to='/'>Life stories</Link>
        </Col>
        <Col>
          <Button label='Theme' onClick={()=> this.props.context.switchTheme(this.props.context.theme === 'light' ? 'dark' : 'light')} />
        </Col>
      </Grid>
    </footer>
  }
}
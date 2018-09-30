
import * as React from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'

import { db, auth } from './clients/firebase'

import { DBContext } from './contexts/db'
import { AuthContext } from './contexts/auth'

import { Home } from './routes/home'
import { Login, Logout } from './routes/login'
import { Signup } from './routes/signup'
import { Me } from './routes/me'
import { ChapterEditor } from './routes/chapter'


interface Props {}
interface State {
  loading: boolean,
  user?: firebase.User
}
class App extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    auth.onAuthStateChanged(user => this.setState({
      loading: false,
      user
    }))
  }

  public render() {
    return <DBContext.Provider value={{ db }}>
      <AuthContext.Provider value={{ auth, user: this.state.user }}>
      <BrowserRouter>
        <>
          <header><Link to='/'>Draaft.net</Link></header>
          <Switch>
            <Route exact path='/me' component={Me} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />

            <Route exact path='/chapters/:id' component={ChapterEditor} />

            <Route exact path='/' component={Home} />
          </Switch>
        </>
      </BrowserRouter>
      </AuthContext.Provider>
    </DBContext.Provider>
  }
}


render(<App />, document.getElementById('app'))

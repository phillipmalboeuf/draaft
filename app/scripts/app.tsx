
import * as React from 'react'
import { render, hydrate } from 'react-dom'
import { BrowserRouter, Route, Redirect, Switch, Link } from 'react-router-dom'

import { db, auth } from './clients/firebase'

import { DBContext } from './contexts/db'
import { AuthContext } from './contexts/auth'
import { ThemeContext } from './contexts/theme'

import { Home } from './routes/home'
import { Login, Logout } from './routes/login'
import { Signup } from './routes/signup'
import { Me } from './routes/me'
import { NewChapter } from './routes/new_chapter'
import { ChapterEditor } from './routes/chapter'
import { NewNote } from './routes/new_note'
import { NoteReader } from './routes/note'

import { Header } from './components/header'
import { Footer } from './components/footer'


interface Props {}
interface State {
  loading: boolean,
  user?: firebase.User,
  theme: string
}
class App extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      loading: true,
      theme: localStorage.getItem('theme') || 'light'
    }
  }

  switchTheme(theme: string) {
    localStorage.setItem('theme', theme)
    this.setState({ theme })
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
      <ThemeContext.Provider value={{ theme: this.state.theme, switchTheme: this.switchTheme.bind(this) }}>
      <BrowserRouter>
        <div className={`main ${this.state.theme}`} role='main'>
          <Header />
          <Switch>
            <Route exact path='/me' component={Me} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/logout' component={Logout} />

            <Route exact path='/new_chapter' component={NewChapter} />
            <Route exact path='/chapters/:id' component={ChapterEditor} />

            <Route exact path='/new_note' component={NewNote} />
            <Route exact path='/notess/:id' component={NoteReader} />

            <Route exact path='/' component={Home} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
      </ThemeContext.Provider>
      </AuthContext.Provider>
    </DBContext.Provider>
  }
}


render(<App />, document.getElementById('app'))

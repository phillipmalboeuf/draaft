import * as React from 'react'
import { auth } from 'firebase'


export const AuthContext = React.createContext({
  auth: null as auth.Auth,
  user: null as firebase.User
})

export interface AuthContextProps {
  context?: {
    auth: auth.Auth,
    user: firebase.User
  }
}

export function withAuthContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <AuthContext.Consumer>{context => <Component {...props} context={context} />}</AuthContext.Consumer>) as any as T
}
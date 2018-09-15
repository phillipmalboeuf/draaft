import * as React from 'react'
import { firestore } from 'firebase'


export const DBContext = React.createContext({
  db: null as firestore.Firestore
})

export interface DBContextProps {
  context?: {
    db: firestore.Firestore
  }
}

export function withDBContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <DBContext.Consumer>{context => <Component {...props} context={context} />}</DBContext.Consumer>) as any as T
}
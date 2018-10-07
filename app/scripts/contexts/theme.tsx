import * as React from 'react'
import { auth } from 'firebase'


export const ThemeContext = React.createContext({
  theme: 'light',
  switchTheme: function(theme: string): void {}
})

export interface ThemeContextProps {
  context?: {
    theme: string,
    switchTheme: (theme: string) => void
  }
}

export function withThemeContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <ThemeContext.Consumer>{context => <Component {...props} context={context} />}</ThemeContext.Consumer>) as any as T
}
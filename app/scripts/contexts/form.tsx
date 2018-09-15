import * as React from 'react'

export const FormContext = React.createContext({
  form_id: undefined as string,
  values: {} as { [key:string]: any },
  onSubmit: function(): void {},
  onChange: function(name: string, value: any): void {},
  waiting: false as boolean
})


export interface FormContextProps {
  context? : {
    values: { [key:string]: any },
    onSubmit?: ()=> void,
    onChange?: (name: string, value: any)=> void
  }
}

export function withFormContext<T extends React.ComponentClass>(Component: T): T {
  return ((props: any)=> <FormContext.Consumer>{context => <Component {...props} context={context} />}</FormContext.Consumer>) as any as T
}
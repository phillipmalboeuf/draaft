import React from 'react'
import { Component, StatelessComponent } from 'react'
import { set, get } from 'object-path'

import { withDBContext, DBContextProps } from '../contexts/db'
import { FormContext } from '../contexts/form'
import { Button } from './button'
import { Editor } from './editor'



interface Props extends DBContextProps {
  id: string,
  values?: { [key:string]: any },
  cta?: string,
  collection?: string,
  doc?: string,
  onSubmit?: (values: { [key:string]: any })=> Promise<any>
}
interface State {
  values: { [key:string]: any },
  waiting: boolean,
  success: boolean
}

@withDBContext
export class Form extends Component<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      values: props.values || {},
      waiting: false,
      success: false
    }
  }

  submit() {
    this.setState({
      waiting: true
    })
    
    this.props.onSubmit && this.props.onSubmit(this.state.values)
      .catch(()=> this.setState({
        waiting: false
      }))

    this.props.collection && this.props.context.db.collection(this.props.collection).doc(this.props.doc).set(this.state.values)
  }

  change(key: string, value: any) {
    set(this.state.values, key, value)
    this.setState({
      values: this.state.values
    })
  }

  render() {
    return <>
      <FormContext.Provider value={{
        form_id: this.props.id,
        values: this.state.values,
        onSubmit: this.submit.bind(this),
        onChange: this.change.bind(this),
        waiting: this.state.waiting
      }}>
        {this.props.children}
      </FormContext.Provider>
      
      <Button label={this.state.waiting ? 'One moment...' : this.props.cta || 'Save'} submit disabled={this.state.waiting} onClick={this.submit.bind(this)} />
    </>
  }
}

export const Input: StatelessComponent<{
  name: string,
  type?: 'password' | 'email' | 'editor',
  label?: string,
  placeholder?: string,
  optional?: boolean,
  autoComplete?: string
}> = (props)=> {
  return <FormContext.Consumer>
    {context => <>
      {props.label && <><label htmlFor={`${context.form_id}_${props.name}`}>{props.label}</label><br /></>}


      { ({
        editor: <Editor delta={get(context.values, props.name)} onChange={delta => context.onChange(props.name, { ...delta })} />
      } as any)[props.type] || <input name={props.name} id={`${context.form_id}_${props.name}`}
        type={props.type ? props.type : 'text'}
        value={get(context.values, props.name) || ''}
        placeholder={props.placeholder}
        required={props.optional ? false : true}
        autoComplete={props.autoComplete}
        onChange={e => context.onChange(props.name, e.currentTarget.value)} />}

      
    </>}
  </FormContext.Consumer>
}
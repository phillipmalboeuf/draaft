import React from 'react'
import { Component, StatelessComponent } from 'react'
import { Redirect } from 'react-router'
import { set, get } from 'object-path'

import { withDBContext, DBContextProps } from '../contexts/db'
import { FormContext } from '../contexts/form'
import { Button } from './button'
import { Editor } from './editor'
import Model from '../models/_model'




interface Props extends DBContextProps {
  id: string,
  values?: { [key:string]: any },
  cta?: string,
  redirect?: string,
  model?: typeof Model,
  modelId?: string,
  autosave?: boolean,
  onSubmit?: (values: { [key:string]: any })=> Promise<any>
}
interface State {
  values: { [key:string]: any },
  waiting: boolean,
  success: boolean,
  error?: string 
}

@withDBContext
export class Form extends Component<Props, State> {

  private autosave: NodeJS.Timer = null

  constructor(props: Props) {
    super(props)
    this.state = {
      values: props.values || {},
      waiting: false,
      success: false
    }
  }

  submit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault()

    this.setState({
      waiting: true
    })

    Promise.all([
      this.props.onSubmit && this.props.onSubmit(this.state.values),
      this.props.model && (this.props.modelId 
        ? this.props.model.update(this.props.modelId, this.state.values)
        : this.props.model.create(this.state.values))
    ])
      .then(()=> this.setState({
        waiting: false,
        success: true,
        error: undefined
      }))
      .catch(e => {
        console.error(e)

        this.setState({
          waiting: false,
          error: e.message
        })
      })
  }

  change(key: string, value: any) {
    set(this.state.values, key, value)
    this.setState({
      values: this.state.values,
      success: false
    })

    if (this.props.autosave) {
      clearTimeout(this.autosave)
      this.autosave = setTimeout(()=> {
        this.submit()
      }, 500)
    }
  }

  render() {
    return <form id={this.props.id} onSubmit={this.submit.bind(this)}>
      <FormContext.Provider value={{
        form_id: this.props.id,
        values: this.state.values,
        onChange: this.change.bind(this),
        waiting: this.state.waiting
      }}>
        {this.props.children}
      </FormContext.Provider>
      
      {this.props.autosave 
      ? this.state.waiting && <em>Autosaving...</em>
      : <Button label={this.state.waiting ? 'One moment...' : this.props.cta || 'Save'} submit disabled={this.state.waiting} />}

      {this.state.error && <>
        <em className='red'>{this.state.error}</em>
      </>}

      {this.state.success && <>
        <strong>Saved!</strong>
        {this.props.redirect && <Redirect to={this.props.redirect} />}
      </>}
    </form>
  }
}

export const Input: StatelessComponent<{
  name: string,
  type?: 'password' | 'email' | 'radios' | 'editor',
  label?: string | JSX.Element,
  placeholder?: string,
  optional?: boolean,
  disabled?: boolean,
  autoComplete?: string,
  options?: {value: string | number, label: string | JSX.Element}[],
  alternate?: boolean
}> = (props)=> {
  return <FormContext.Consumer>
    {context => <>
      { ({
        editor: <Editor delta={get(context.values, props.name)}
          placeholder={props.placeholder}
          alternate={props.alternate}
          onChange={delta => context.onChange(props.name, { ...delta })} />,
        radios: <div className='normal_bottom'>{props.options && props.options.map(option => <React.Fragment key={option.value}>
          <input name={props.name} id={`${context.form_id}_${props.name}_${option.value}`}
            type='radio'
            value={option.value}
            checked={get(context.values, props.name) === option.value}
            disabled={props.disabled ? true : false}
            onChange={e => context.onChange(props.name, e.currentTarget.value)} />
          {option.label && <label htmlFor={`${context.form_id}_${props.name}_${option.value}`}>{option.label}</label>}
        </React.Fragment>)}</div>
      } as any)[props.type] || <>
        {props.label && <label className={props.alternate ? 'label--alternate' : ''} htmlFor={`${context.form_id}_${props.name}`}>{props.label}</label>}
        <input className={props.alternate ? 'input--alternate' : ''} name={props.name} id={`${context.form_id}_${props.name}`}
          type={props.type ? props.type : 'text'}
          value={get(context.values, props.name) || ''}
          placeholder={props.placeholder}
          required={props.optional ? false : true}
          disabled={props.disabled ? true : false}
          autoComplete={props.autoComplete}
          onChange={e => context.onChange(props.name, e.currentTarget.value)} />
      </>}
      
    </>}
  </FormContext.Consumer>
}
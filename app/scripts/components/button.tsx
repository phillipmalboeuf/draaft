
import * as React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  label?: string | JSX.Element,
  to?: string,
  disabled?: boolean,
  submit?: boolean,
  big?: boolean,
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button: React.SFC<Props> = (props) => {
  const className = `button${props.big ? ' button--big' : ''}`

  return props.to
    ? <Link className={className} to={props.to}>{props.label}</Link>
    : <button type={props.submit ? 'submit' : 'button'} className={className} disabled={props.disabled} onClick={(e)=> {
      e.currentTarget.blur()
      props.onClick && props.onClick(e)
    }}>{props.label}</button>
}

import * as React from 'react'
interface GridProps {
  guttered?: boolean,
  center?: boolean,
  middle?: boolean,
  spaced?: boolean,
  thick?: boolean
}

export const Grid: React.SFC<GridProps> = (props) => {
  return <div className={`grid${props.guttered ? ' grid--guttered' : ''}${props.thick ? ' grid--thick_guttered' : ''}${props.center ? ' grid--center' : ''}${props.middle ? ' grid--middle' : ''}${props.spaced ? ' grid--spaced' : ''}`}>{props.children}</div>
}

interface ColProps {
  size?: string,
  style?: any
}

export const Col: React.SFC<ColProps> = (props) => {
  return <div className={`col${props.size ? ` col--${props.size}` : ''}`} style={props.style}>{props.children}</div>
}

interface ThirdProps {
  style?: any
}

export const Third: React.SFC<ThirdProps> = (props) => {
  return <Col size={`1of3`} style={props.style}>{props.children}</Col>
}

export const TwoThirds: React.SFC<ThirdProps> = (props) => {
  return <Col size={`2of3`} style={props.style}>{props.children}</Col>
}

export const Quarter: React.SFC<ThirdProps> = (props) => {
  return <Col size={`3of12`} style={props.style}>{props.children}</Col>
}

export const ThreeQuarters: React.SFC<ThirdProps> = (props) => {
  return <Col size={`9of12`} style={props.style}>{props.children}</Col>
}

export const Half: React.SFC<ThirdProps> = (props) => {
  return <Col size={`6of12`} style={props.style}>{props.children}</Col>
}

export const Full: React.SFC<ThirdProps> = (props) => {
  return <Col size={`12of12`} style={props.style}>{props.children}</Col>
}
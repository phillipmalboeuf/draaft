

import * as React from 'react'
import { Button } from './button'

interface Props {
  visible?: boolean,
  full?: boolean,
  button?: string | JSX.Element,
  onHide?: Function
}
interface State {
  visible: boolean
}

export class Overlay extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      visible: props.visible || false
    }
  }

  public toggle() {
    this.setState({visible: !this.state.visible})
  }

  public hide() {
    this.setState({visible: false})
    this.props.onHide && this.props.onHide()
  }

  public render() {
    return <>
      {this.props.button && <Button transparent label={this.props.button} onClick={()=> this.toggle()} />}
      {this.state.visible
        ? <div className={`overlay${this.props.full ? ` overlay--full` : ''}`}>
          {this.props.full && <button className='button--transparent overlay__back' onClick={()=> this.hide()} />}
          <div className={`overlay__container`} onClick={()=> this.hide()}>
            <button className='button--transparent overlay__close' onClick={()=> this.hide()}>✕</button>
            {this.props.children}
          </div>
        </div>
        : null}
    </>
  }
}

import * as React from 'react'
import { Link } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { Chapter } from '../models/chapter'


interface Props extends DBContextProps {}
interface State {
  chapters: any[]
}

@withDBContext
export class Chapters extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props)
    this.state = {
      chapters: null
    }
  }


  componentDidMount() {
    Chapter.list().then(chapters => this.setState({ chapters }))
  }

  public render() {
    return <ol>
      {this.state.chapters && this.state.chapters.map(chapter => <li key={chapter.id}>
        <Link to={`/chapters/${chapter.id}`}>{chapter.title}</Link>
      </li>)}
    </ol>
  }
}
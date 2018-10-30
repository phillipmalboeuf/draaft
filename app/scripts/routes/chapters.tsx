
import * as React from 'react'
import { Link } from 'react-router-dom'

import { withDBContext, DBContextProps } from '../contexts/db'
import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Filters } from '../models/_model'
import { Chapter } from '../models/chapter'

import { Form, Input } from '../components/form'
import { Grid, Quarter, TwoThirds, Col } from '../components/grid';



interface Props extends DBContextProps {
  filters?: Filters
}
interface State {
  chapters: any[]
}

@withDBContext
@withAuthContext
export class Chapters extends React.PureComponent<Props & AuthContextProps, State> {

  constructor(props: Props & AuthContextProps) {
    super(props)
    this.state = {
      chapters: null
    }
  }


  componentDidMount() {
    this.fetchChapters()
  }

  public fetchChapters() {
    return Chapter.list(this.props.filters || []).then(chapters => this.setState({ chapters }))
  }

  public render() {
    return <>
      {this.state.chapters && this.state.chapters.map(chapter => <Link to={`/chapters/${chapter.id}`} key={chapter.id}>
        <Grid guttered spaced>
          <Col>PM</Col>
          <TwoThirds>
            <p className='slight'>
              {chapter.title}<br />
              {chapter.excerpt}
            </p>
          </TwoThirds>
          <Col>{chapter.date}</Col>
        </Grid>
      </Link>)}
    </>
  }
}

import * as React from 'react'
import { Link, Redirect, HashRouter, Switch, Route } from 'react-router-dom'

import { Form, Input } from '../components/form'
import { withAuthContext, AuthContextProps } from '../contexts/auth'
import { Chapter } from '../models/chapter'


interface Props extends AuthContextProps {}
interface State {}


@withAuthContext
export class NewChapter extends React.Component<Props, State> {

  public render() {
    return this.props.context.user
    ? <HashRouter>
      <Switch>
        <Route exact path='/' render={({ history })=> <div className='text_center'>
          <h1 className='max_width'>Pick a style of entry you'd like to write:</h1>

          <Form id='style' cta='Next' values={{ style: 'dated' }} onSubmit={values => Promise.resolve(history.push(`/${values.style}`))}>
            <div className='padded'>
              <Input type='radios' name='style' options={[
                {
                  value: 'dated',
                  label: <>
                    <h4>Time piece</h4>
                    <p>Something that happened in your life tied to a date and time. (Text heavy)</p>
                  </>
                },
                {
                  value: 'photos',
                  label: <>
                    <h4>Photo journal</h4>
                    <p>Photos from your life you want to share. (Photo heavy)</p>
                  </>
                },
                {
                  value: 'lessons',
                  label: <>
                    <h4>Life lessons</h4>
                    <p>Writing about a specific things you learned and want to share. (Informal)</p>
                  </>
                },
                {
                  value: 'blank',
                  label: <>
                    <h4>Blank space</h4>
                    <p>Write about anything and everything. Outside the box.</p>
                  </>
                }
              ]} />
            </div>
          </Form>
        </div>} />


        <Route exact path='/dated' render={()=> <Form id='new_chapter' model={Chapter} values={{
          user: this.props.context.user.uid,
          by: this.props.context.user.displayName
        }} cta='Write your draaft'>
          <Input name='date' alternate label='Give this story a date' placeholder='E.g. 1984, January 2011, Last week...' />
          <Input name='title' alternate label='Give your entry a title' placeholder='E.g. The year Obama became president' />
        </Form>} />
      </Switch>
    </HashRouter>
    : null
  }
}

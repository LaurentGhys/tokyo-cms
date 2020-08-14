import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthPage, DashboardPage, EditorPage } from './components/Pages'
import './stylesheets/global.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={AuthPage} />
        <Route path='/login' component={AuthPage} />
        <Route path='/dashboard' exact component={DashboardPage} />
        <Route path='/editor' component={EditorPage} />
      </Switch>
    </Router>
  )
}

export default App
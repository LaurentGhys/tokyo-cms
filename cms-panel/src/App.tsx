import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AdminAppSettingsPage, AdminAppsPage, AdminNewAppPage } from './admin/components/Pages'
import { ClientAppEditorPage, ClientAppsPage } from './client/components/Pages'
import { AuthPage } from './global/components/Pages'
import './global/stylesheets/global.scss'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={AuthPage} />
        <Route path='/login' component={AuthPage} />
        <Route path='/client' exact component={ClientAppsPage} />
        <Route path='/client/dashboard' component={ClientAppsPage} />
        <Route path='/client/editor/:appId' component={ClientAppEditorPage} />
        <Route path='/admin' exact component={AdminAppsPage} />
        <Route path='/admin/dashboard' component={AdminAppsPage} />
        <Route path='/admin/settings/:appId' component={AdminAppSettingsPage} />
        <Route path='/admin/newApp' component={AdminNewAppPage} />
      </Switch>
    </Router>
  )
}

export default App
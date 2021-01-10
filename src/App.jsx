import { HomeView } from './views/home'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path="/" component={HomeView} />
  </Switch>
)

export default App

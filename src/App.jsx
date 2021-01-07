import Home from './Home'

import React from 'react'
import { Route, Switch } from 'react-router-dom'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
  </Switch>
)

export default App

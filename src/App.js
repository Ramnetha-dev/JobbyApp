import {Route, Switch} from 'react-router-dom'

import Home from './components/Home/index'

import Login from './components/Login/index'

import Jobs from './components/Jobs/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import JobItem from './components/JobItem'
import NotFound from './components/NotFound/index'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const App = () => (
  <div>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
      <Route exact path="/not-found" component={NotFound} />
      <Route exact component={NotFound} />
    </Switch>
  </div>
)

export default App

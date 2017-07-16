import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css' // @TODO move out
import registerServiceWorker from './registerServiceWorker'
import App from './components/App/'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" render={ props => <App view="home" {...props}/> }/>
      <Route path="/work/:contentId" render={ props => <App view="work" {...props}/> }/>
      <Route path="/work" render={ props => <App view="work" {...props}/> }/>
      <Route path="/words/:contentId" render={ props => <App view="words" {...props}/> }/>
      <Route path="/words" render={ props => <App view="words" {...props}/> }/>
      <Route path="/who" render={ props => <App view="who" {...props}/> }/>
      <Route render={ props => <App view="404" {...props}/> }/>
    </Switch>
  </Router>
  , document.getElementById('root')
)
registerServiceWorker()

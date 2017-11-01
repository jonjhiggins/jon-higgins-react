import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker'
import ErrorPage from './components/ErrorPage/'
import Home from './components/Home/'
import Navigation from './components/Navigation/'
import Who from './components/Who/'
import Words from './components/Words/'
import Work from './components/Work/'
import siteData from './data/site.json' // @TODO improve path or pass from index.js
import './index.css' // @TODO move out

ReactDOM.render(
  <Router>
    <div id="app">
      <header className="header" id="header">
        <h2 className="header__text">{siteData.siteDescription}</h2>
        <Navigation navigationData={siteData.navigation}/>
      </header>
      <main id="main">
        <Switch>
          <Route exact path="/" component={ Home }/>
          <Route path="/work/:contentID" component={ Work } />
          <Route path="/work" component={ Work } />
          <Route path="/words/:contentID" component={ Words } />
          <Route path="/words" component={ Words } />
          <Route path="/who" render={(props) => (
            <Who {...props} contentID='who' />
          )} />
          <Route component={ ErrorPage } />
        </Switch>
      </main>
      <footer id="footer"></footer>
    </div>
  </Router>
  , document.getElementById('root')
)
registerServiceWorker()

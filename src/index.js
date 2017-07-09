import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import siteData from './data/site.json'
import Home from './components/Home/'
import Articles from './components/Articles/'
import Navigation from './components/Navigation/'

ReactDOM.render(
  <Router>
    <div id="app">
      <header className="header" id="header">
        <h2 className="header__text">{siteData.siteDescription}</h2>
        <Navigation navigationData={siteData.navigation}/>
      </header>
      <main id="main">
        <Route exact path="/" component={Home}/>
        <Route path="/work" component={Articles} view="word"/>
        <Route path="/words" component={Articles} view="words"/>
        <Route path="/who" component={Articles} view="who"/>
      </main>
      <footer id="footer"></footer>
    </div>
  </Router>
  , document.getElementById('root')
)
registerServiceWorker()

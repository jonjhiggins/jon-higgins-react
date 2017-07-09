import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './index.css'
import registerServiceWorker from './registerServiceWorker'
import siteData from './data/site.json'
import Home from './components/Home/'
import Articles from './components/Articles/'
import Navigation from './components/Navigation/'

const NoMatch = ({ location }) => (
  <article className="article article--">
    <div className="page">
      <h1 className="article__title">Page not found</h1>
      <div className="article__description"><p>Sorry about that. <a href="/">Go home</a></p></div>
    </div>
  </article>
)

ReactDOM.render(
  <Router>
    <div id="app">
      <header className="header" id="header">
        <h2 className="header__text">{siteData.siteDescription}</h2>
        <Navigation navigationData={siteData.navigation}/>
      </header>
      <main id="main">
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/work" render={ props => <Articles view="work" {...props}/> }/>
          <Route path="/words" render={ props => <Articles view="words" {...props}/> }/>
          <Route path="/who" render={ props => <Articles view="who" {...props}/> }/>
          <Route component={NoMatch} status={404}/>
        </Switch>
      </main>
      <footer id="footer"></footer>
    </div>
  </Router>
  , document.getElementById('root')
)
registerServiceWorker()

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Transition } from 'react-transition-group'
import ErrorPage from '../ErrorPage/'
import Home from '../Home/'
import Navigation from '../Navigation/'
import Outline from '../Outline/'
import Who from '../Who/'
import Words from '../Words/'
import Work from '../Work/'
import siteData from '../../data/site.json' // @TODO improve path or pass from index.js

class App extends Component {
  constructor (props) {
    super(props)

    this.handleOutlineDraw = this.handleOutlineDraw.bind(this)
    this.handleOutlineShow = this.handleOutlineShow.bind(this)

    this.state = {
      outlineStyles: {
        height: 0,
        width: 0,
        left: 0,
        top: 0
      },
      outlineShow: false
    }
  }

  /**
   * Show the <outline> element to draw an animated outline
   * @param {boolean} show show or hide
   */
  handleOutlineShow (show) {
    this.setState({outlineShow: show})
  }

  /**
   * Update <outline>'s state to draw an animated outline
   * @param  {object} styles styles object, keys must match standard HTMLElement.style options
   */
  handleOutlineDraw (styles) {
    this.setState({ outlineStyles: styles })
  }

  /**
   * Hide <outline> when animation finsihed
   */
  handleOutlineEntered () {
    this.setState({ outlineShow: false })
  }

  render () {
    return (
      <Router>
        <div id="app">
          <header className="header" id="header">
            <h2 className="header__text">{siteData.siteDescription}</h2>
            <Navigation navigationData={siteData.navigation}/>
          </header>
          <main id="main">
            <Switch>
              <Route exact path="/" render={(props) => (
                <Home {...props} outlineShow={this.handleOutlineShow} />
              )}/>
              <Route path="/work/:contentID" component={ Work } />
              <Route path="/work" component={ Work } />
              <Route path="/words/:contentID" component={ Words } />
              <Route path="/words" component={ Words } />
              <Route path="/who" render={(props) => (
                <Who {...props} contentID='who' outlineDraw={this.handleOutlineDraw} outlineShow={this.handleOutlineShow} />
              )} />
              <Route component={ ErrorPage } />
            </Switch>
          </main>
          <footer id="footer"></footer>
          <Transition
            in={this.state.outlineShow}
            timeout={2000}
            onEntered={this.handleOutlineEntered.bind(this)}
          >
            <Outline outlineStyles={this.state.outlineStyles} show={this.state.outlineShow}/>
          </Transition>
        </div>
      </Router>
    )
  }
}

export default App

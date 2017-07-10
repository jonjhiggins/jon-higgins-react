import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import siteData from '../../data/site.json' // @TODO improve path or pass from index.js
import Home from '../../components/Home/' // @TODO improve path or pass from index.js
import Articles from '../../components/Articles/' // @TODO improve path or pass from index.js
import Navigation from '../../components/Navigation/' // @TODO improve path or pass from index.js

// @TODO move into separate component?
const NoMatch = () => (
  <article className="article article--">
    <div className="page">
      <h1 className="article__title">Page not found</h1>
      <div className="article__description"><p>Sorry about that. <a href="/">Go home</a></p></div>
    </div>
  </article>
)

class App extends Component {
  /**
   * Set initial state on component init
   */
  constructor (props) {
    super(props)
    this.state = { selectedLinkId: 0 }
  }
  getMainArea (view) {
    switch (view) {
      case 'home':
        return <Home/>
      case 'work':
        return <Articles title="Work" description="Article content"/>
      case 'words':
        return <Articles title="Words"/>
      case 'who':
        return <Articles title="Who"/>
      default:
        return <NoMatch/>
    }
  }
  render () {
    const main = this.getMainArea(this.props.view)
    return (
      <div id="app">
        <header className="header" id="header">
          <h2 className="header__text">{siteData.siteDescription}</h2>
          <Navigation navigationData={siteData.navigation} activeLink={this.props.view}/>
        </header>
        <main id="main">
          {main}
        </main>
        <footer id="footer"></footer>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import siteData from '../../data/site.json' // @TODO improve path or pass from index.js
import Home from '../../components/Home/' // @TODO improve path or pass from index.js
import Articles from '../../components/Articles/' // @TODO improve path or pass from index.js
import Article from '../../components/Article/' // @TODO improve path or pass from index.js
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
  constructor (props) {
    super(props)
    this.state = {
      words: {}
    }
  }

  /**
   * Load articles via AJAX
   */
  componentDidMount () {
    fetch('/data/words.json')
      .then(response => response.json())
      .then(json => {
        this.setState({ words: json })
      })
  }
  /**
   *  Decide which component to render in main area
   *  @param {string} view - home / work / word / who
   *  @param {promise} contentId
   */
  getMainArea (view, contentId) {
    switch (view) {
      case 'home':
        return <Home/>
      case 'work':
        return contentId ? <Article type="work" content={this.state.words[contentId]}/> : <Articles type="work"/>
      case 'words':
        return contentId ? <Article type="words" content={this.state.words[contentId]}/> : <Articles type="words" content={this.state.words}/>
      case 'who':
        return <Articles title="Who"/>
      default:
        return <NoMatch/>
    }
  }
  render () {
    const main = this.getMainArea(this.props.view, this.props.match.params.contentId)
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

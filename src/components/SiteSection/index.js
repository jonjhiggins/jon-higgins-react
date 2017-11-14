/**
 * Used for each main section of site (words, work, who)
 * Loads content via AJAX then renders in either an <Article> or <Articles>
 * component.
 * @type {class}
 */

import React, { Component } from 'react'
import Articles from '../../components/Articles/' // @TODO improve path or pass from index.js
import Article from '../../components/Article/' // @TODO improve path or pass from index.js

class SiteSection extends Component {
  /**
   * constructor
   * @param  {object} props react props obj
   * @param  {string} type 'work' / 'words' / 'who'
   */
  constructor (props, type) {
    super(props)
    this.type = type
    this.state = {
      [this.type]: {}
    }
  }

  componentDidMount () {
    fetch(`/data/${this.type}.json`)
      .then(response => response.json())
      .then(json => {
        this.setState({ [this.type]: json })
      })
  }

  render () {
    // Probably should pass in contentID consistently. This was quick fix to allow
    // manually passing in of "who" contentID for "who" section
    let contentID = this.props.contentID
    if (!contentID) {
      contentID = this.props.match.params.contentID !== 'archive' ? this.props.match.params.contentID : null
    }

    const archive = this.props.match.params.contentID === 'archive'

    // If there's a contentID we show individual article view, if not show list articles view
    if (contentID) {
      return (<Article type={this.type} content={this.state[this.type][contentID]} outlineDraw={this.props.outlineDraw} outlineShow={this.props.outlineShow} />)
    } else {
      return (<Articles type={this.type} content={this.state[this.type]} archiveMode={archive} archiveAvailable={true} outlineDraw={this.props.outlineDraw}/>)
    }
  }
}

export default SiteSection

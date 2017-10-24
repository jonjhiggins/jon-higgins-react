/**
 * List view of articles, e.g. /work
 */

import React from 'react'
import BaseComponent from '../BaseComponent'
import ArticlesItem from '../../components/ArticlesItem/'
import { Link } from 'react-router-dom'
import App from '../../components/App/'
import { Transition } from 'react-transition-group'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class Articles extends BaseComponent {
  render () {
    const contentObject = this.props.content
    const archiveMode = this.props.archiveMode
    let contentArray = null

    // Turn content into an array and sort by date
    // filter out archived/non-archived depending on mode
    if (contentObject) {
      contentArray = Object.keys(contentObject)
        .map(key => {
          const obj = contentObject[key]
          obj.slug = key
          return obj
        })
        .sort((x, y) => new Date(y.date) - new Date(x.date))
        .filter(item => {
          const archived = item.archive === true
          return archived === archiveMode
        })
    }

    return (
      <div className="module module--article-list body-text">
        <Transition
          in={this.state.baseAnimationIn}
          timeout={this.settings.baseAnimationFadeInDuration}
          onEnter={this.handleEnter.bind(this)}
          onExit={this.handleExit.bind(this)}
          onExiting={this.handleExit.bind(this)}
          ref="baseAnimationWrapper"
        >
          <div className="container">
            {this.props.archiveMode &&
              <h1 className="module__title">Work Archive</h1>
            }

            <div className="article-list">
              {contentArray && contentArray.map((content, index) => <ArticlesItem key={index} content={content} type={this.props.type}/>)}
            </div>

            {this.props.archiveAvailable &&
              <div className="button-holder"><Link to="/work/archive" className="button button--arrow button--secondary">View Archived Work</Link></div>
            }
          </div>
        </Transition>
      </div>

    )
  }
}

export default Articles

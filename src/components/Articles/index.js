/**
 * List view of articles, e.g. /work
 */

import React, { Component } from 'react'
import ArticlesItem from '../../components/ArticlesItem/'

class Articles extends Component {
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
        <div className="container">
          {this.props.archiveMode &&
            <h1 className="module__title">Work Archive</h1>
          }

          <div className="article-list">
            {contentArray && contentArray.map((content, index) => <ArticlesItem key={index} content={content} type={this.props.type}/>)}
          </div>

          {this.props.archiveAvailable &&
            <div className="button-holder"><a href="/work/archive" className="button button--arrow button--secondary">View Archived Work</a></div>
          }
        </div>
      </div>

    )
  }
}

export default Articles

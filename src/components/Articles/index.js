import React, { Component } from 'react'
import ArticlesItem from '../../components/ArticlesItem/'

class Articles extends Component {
  render () {
    const contentObject = this.props.content
    const contentArray = contentObject ? Object.keys(contentObject).map(key => contentObject[key]) : null

    return (
      <div className="module module--article-list body-text">
        <div className="container">
          {this.props.archiveMode &&
            <h1 className="module__title">Work Archive</h1>
          }

          <div className="article-list">
            {contentArray && contentArray.map((content, index) => <ArticlesItem key={ index } content={content}/>)}
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

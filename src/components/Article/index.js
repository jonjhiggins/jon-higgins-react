/**
 * Single article view, e.g. /work/land-rover-interactive-stories
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import marked from 'marked'
import {highlightAuto} from 'highlight.js'
import 'highlight.js/styles/github.css'

marked.setOptions({
  highlight: function (code) {
    return highlightAuto(code).value
  }
})

class Articles extends Component {
  formatContent () {
    return {
      date: this.props.content && this.props.content.date ? moment(this.props.content.date, 'YYYYMMDD').format('MMM YYYY') : '',
      title: this.props.content ? this.props.content.title : '',
      heroImages: this.props.content ? this.props.content.heroImages : null,
      text: this.props.content ? this.props.content.content : '',
      contentUrl: this.props.content ? this.props.content.contentUrl : null
    }
  }

  render () {
    const content = this.formatContent()
    return (
      <article className="article {content.class ? 'article--' + content.class : ''}">
        <div className="page">
          {content.date &&
            <p className="article__date">{content.date}</p>
          }
          <h1 className="article__title">{content.title}</h1>
          {/*}{this.showHeroImages(content.heroImages)}*/}
          <div className="article__description" dangerouslySetInnerHTML={{__html: marked(content.text)}}></div>
          {content.contentUrl &&
            <div className="article__buttons button-holder">
              <a href={content.contentUrl} className="button button--arrow">View Work</a>
            </div>
          }
        </div>
      </article>
    )
  }
}

Articles.propTypes = {
  content: PropTypes.shape({
    date: PropTypes.date,
    title: PropTypes.string,
    heroImages: PropTypes.array,
    text: PropTypes.string,
    contentUrl: PropTypes.string
  })
}

export default Articles

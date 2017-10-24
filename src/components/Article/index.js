/**
 * Single article view, e.g. /work/land-rover-interactive-stories
 */

import React from 'react'
import BaseComponent from '../BaseComponent'
import PropTypes from 'prop-types'
import moment from 'moment'
import marked from 'marked'
import {highlightAuto} from 'highlight.js'
import { Transition } from 'react-transition-group'
import 'highlight.js/styles/github.css'

// Override image renderer so that webpack can handle
marked.prototype.constructor.Renderer.prototype.image = function (href, title, text) {
  return `<img src=${require(`../../assets/img/${href}`)} alt="${text}" title="${title}"/>`
}

marked.setOptions({
  highlight: function (code) {
    return highlightAuto(code).value
  }
})

class Article extends BaseComponent {
  formatContent () {
    return {
      date: this.props.content && this.props.content.date ? moment(this.props.content.date, 'YYYYMMDD').format('MMM YYYY') : '',
      title: this.props.content ? this.props.content.title : '',
      heroImages: this.props.content ? this.props.content.heroImages : null,
      text: this.props.content ? this.props.content.content : '',
      contentUrl: this.props.content ? this.props.content.content_url : null
    }
  }

  render () {
    const content = this.formatContent()
    return (
      <article className="article {content.class ? 'article--' + content.class : ''}">
        <Transition
          in={this.state.baseAnimationIn}
          timeout={this.settings.baseAnimationFadeInDuration}
          onEnter={this.handleEnter.bind(this)}
          ref="baseAnimationWrapper"
        >
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
        </Transition>
      </article>
    )
  }
}

Article.propTypes = {
  content: PropTypes.shape({
    date: PropTypes.date,
    title: PropTypes.string,
    heroImages: PropTypes.array,
    text: PropTypes.string,
    contentUrl: PropTypes.string
  })
}

export default Article

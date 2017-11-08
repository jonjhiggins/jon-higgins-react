/**
 * Single article view, e.g. /work/land-rover-interactive-stories
 */

import React from 'react'
import { findDOMNode } from 'react-dom'
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
  constructor () {
    super()

    this.pageElement = null // used to draw outline animation over
    this.outlineStyles = {
      height: 0,
      width: 0,
      left: 0,
      top: 0
    }
  }
  /**
   * Called when component is mounted (initialised) by React
   */
  componentDidMount () {
    this.pageElement = findDOMNode(this.refs.pageElement)
    this.outlineAnimation()
  }

  componentDidUpdate () {
    this.setOutlineAnimationSize()
  }

  /**
   * Draw outline of the article for use as transition animation
   */
  outlineAnimation () {
    this.setOutlineAnimationSize()
    // Animate elements
  }

  setOutlineAnimationSize () {
    // Get measurements
    let { height, width, top, left } = this.pageElement.getBoundingClientRect()
    // Take into account window scrolling
    top = top += window.scrollY
    left = left += window.scrollX
    // Add in border color
    const borderColor = window.getComputedStyle(this.pageElement).borderColor
    const styles = { height, width, top, left, color: borderColor }

    if (this.outlineStyles.height !== height ||
        this.outlineStyles.width !== width ||
        this.outlineStyles.top !== top ||
        this.outlineStyles.left !== left) {
      this.props.outlineDraw(styles)
      this.outlineStyles = styles
    }
  }

  /**
   * Get the article's content in correct format
   */
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
          <div className="page" ref="pageElement">
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

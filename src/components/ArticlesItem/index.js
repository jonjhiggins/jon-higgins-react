/**
 * Single article component, used with in within
 * an Articles component (list view)
 */

import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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

class ArticlesItem extends Component {
  formatContent () {
    return {
      url: this.props.content ? `/${this.props.type}/${this.props.content.slug}` : '',
      date: this.props.content ? moment(this.props.content.date, 'YYYYMMDD').format('MMM YYYY') : '',
      images: this.props.content ? this.props.content.images : '',
      title: this.props.content ? this.props.content.title : '',
      description: this.props.content ? this.props.content.description : '',
      className: this.props.content ? this.props.content.class : '',
    }
  }

  render () {
    const content = this.formatContent()
    const responsiveImages = content.images && content.images.length > 1
    return (
      <article className={`article-item ${content.className ? 'article-item--' + content.className : ''}`}>
        <Link to={content.url} className="article-item__link">
          <header className="article-item__header">
            {/* @TODO add date in {{#if archiveMode}}
            <p className="article-item__date">{{date}}</p>
            */}
            <h3 className="article-item__title h1">{content.title}</h3>
          </header>
          {content.images &&
            <figure className="article-item__image">
              {responsiveImages &&
                <picture>
                  <source media="(min-width: 58.25rem)" srcSet={`/assets/img/${content.images[1]}`} /> {/* Large breakpoint */}
                  <img src={`/assets/img/${content.images[0]}`} alt=""/>
                </picture>
              }
              {!responsiveImages && content.images.length &&
                  <img src={require(`../../assets/img/${content.images[0]}`)} alt="" />
              }
            </figure>
          }
          <footer className="article-item__footer">
            <p className="article-item__description">{content.description}</p>
            <div className="article-item__buttons button-holder">
              <div className="button button--arrow">View</div>
            </div>
          </footer>
        </Link>
      </article>

    )
  }
}

ArticlesItem.propTypes = {
  content: PropTypes.shape({
    url: PropTypes.url,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.date,
    className: PropTypes.string,
    images: PropTypes.array
  })
}

export default ArticlesItem

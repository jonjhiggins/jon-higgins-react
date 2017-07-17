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

class ArticlesItem extends Component {

  articleClassName (className) {
    className = className ? 'article--' + className : ''
    return `article ${className}`;
  }

  showHeroImages (images) {
    // @TODO
    {/*
      {{#if item.heroImages}}
          <div class="article__hero-images">
              {{#each item.heroImages}}
                  <figure class="article__hero-content article__hero-content--image {{#unless this.caption}}article__hero-content--no-caption{{/unless}}">
                      <span class="article__hero-image-holder"><img src="/assets/img/{{this.image}}" alt="" /></span>
                      {{#if this.caption}}<figcaption class="article__hero-caption">{{this.caption}}</figcaption>{{/if}}
                  </figure>
              {{/each}}
          </div>
      {{/if}
    */}
    return null
  }

  formatContent () {
    return {
      url: this.props.content ? this.props.content.url : '',
      date: this.props.content ? moment(this.props.content.date, 'YYYYMMDD').format('MMM YYYY') : '',
      images: this.props.content ? this.props.content.images : '',
      title: this.props.content ? this.props.content.title : '',
      description: this.props.content ? this.props.content.description : ''
    }
  }

  render () {
    const content = this.formatContent()
    const responsiveImages = content.images > 1
    return (
      <a href="{content.url}" className="article-item__link">
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
                <source media="(min-width: 58.25rem)" srcset="/assets/img/{content.images[1]}" /> {/* Large breakpoint */}
                <img src="/assets/img/{content.images[0]}" alt=""/>
              </picture>
            }
            {!responsiveImages &&
                <img src="/assets/img/{content.images[1]}" alt="" />
            }
          </figure>
        }
        <footer className="article-item__footer">
          <p className="article-item__description">{content.description}</p>
          <div className="article-item__buttons button-holder">
            <div className="button button--arrow">View</div>
          </div>
        </footer>
      </a>

    )
  }
}

ArticlesItem.propTypes = {
  content: PropTypes.shape({
    url: PropTypes.url,
    title: PropTypes.string,
    description: PropTypes.string,
    date: PropTypes.date
  })
}

export default ArticlesItem

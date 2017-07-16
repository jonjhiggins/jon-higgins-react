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
  showButtons (contentUrl) {
    const buttonHtml = (
      <div className="article__buttons button-holder">
        <a href={contentUrl} className="button button--arrow">View Work</a>
      </div>
    )
    return contentUrl ? buttonHtml : ''
  }

  formatContent () {
    return {
      date: this.props.content ?  moment(this.props.content.date, 'YYYYMMDD').format('MMM YYYY') : '',
      title: this.props.content ? this.props.content.title : '',
      heroImages: this.props.content ? this.props.content.heroImages : null,
      text: this.props.content ? this.props.content.content : '',
      contentUrl: this.props.content ? this.props.content.contentUrl : null
    }
  }

  render () {
    const content = this.formatContent()
    return (
      <article className={this.articleClassName()}>
        <div className="page">

          <p className="article__date">{content.date}</p>
          <h1 className="article__title">{content.title}</h1>
          {this.showHeroImages(content.heroImages)}
          <div className="article__description" dangerouslySetInnerHTML={{__html: marked(content.text)}}></div>
          {this.showButtons(content.contentUrl)}
        </div>
      </article>
    )
  }
}

ArticlesItem.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    heroImages: PropTypes.array,
    contentUrl: PropTypes.string,
    date: PropTypes.date
  })
};

export default ArticlesItem

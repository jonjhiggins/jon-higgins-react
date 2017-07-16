import React, { Component } from 'react'
import PropTypes from 'prop-types';

class ArticlesItem extends Component {

  articleClassName (className) {
    className = className ? 'article--' + className : ''
    return `article ${className}`;
  }

  showDate (date) {
    return date ? <p className="article__date">{date}</p> : ''
  }

  showTitle (title) {
    return title ? <h1 className="article__title">{title}</h1> : ''
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
  showText (description) {
    {/*

    {{#if item.content_url}}
        <div class="article__buttons button-holder">
            <a href="{{item.content_url}}" class="button button--arrow">View Work</a>
        </div>
    {{/if}}
    */}
    return <div className="article__description">{description}</div>
  }
  showButtons (contentUrl) {
    const buttonHtml = (
      <div className="article__buttons button-holder">
        <a href={contentUrl} className="button button--arrow">View Work</a>
      </div>
    )
    return contentUrl ? buttonHtml : ''
  }

  render () {
    return (
      <article className={this.articleClassName}>
        <div className="page">
          // {this.showDate(this.props.date)}
          // {this.showTitle(this.props.title)}
          // {this.showHeroImages(this.props.heroImages)}
          // {this.showText(this.props.text)}
          // {this.showButtons(this.props.contentUrl)}
        </div>
      </article>
    )
  }
}


ArticlesItem.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.string
  })
};

export default ArticlesItem

import React, { Component } from 'react'

class Articles extends Component {
  render () {
    return (
      <article className="">
        <div className="page">
          <h1 className="article__title">{this.props.title}</h1>
        </div>
      </article>
    )
  }
}

export default Articles

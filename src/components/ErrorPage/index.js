import React, { Component } from 'react'

class ErrorPage extends Component {
  render () {
    return (
      <article className="article article--error-page">
        <div className="page">
          <h1 className="article__title">Page not found</h1>
          <div className="article__description"><p>Sorry about that. <a href="/">Go home</a></p></div>
        </div>
      </article>
    )
  }
}

export default ErrorPage

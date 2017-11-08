import React, { Component } from 'react'

class Outline extends Component {
  render () {
    return (
      <div className="outline" style={this.props.outlineStyles}><span></span><span></span><span></span><span></span></div>
    )
  }
}

export default Outline

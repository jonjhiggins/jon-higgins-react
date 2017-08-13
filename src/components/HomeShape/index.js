import React, { Component } from 'react'

class HomeShape extends Component {
  constructor (props) {
    super(props)

    this.state = this.props.state
  }

  getShapeClassName () {
    const base = 'shape'
    const is3d = this.state.is3d ? 'shape--3d' : ''
    const highlight = this.state.highlight ? 'js--highlight' : ''
    const showSide = `shape--show-${this.state.showSide}`

    return `${base} ${is3d} ${highlight} ${showSide}`
  }

  render () {
    return (
      <div
        className={`animation__block  ${this.state.is3dParent ? 'animation__block--3d' : ''}`}>
        <div className={this.getShapeClassName()}>
          <div className="shape__side"><span className="heading h1 shape__text" dangerouslySetInnerHTML={{__html: this.state.content[0] }}></span></div>
          <div className="shape__side"><span className="heading h1 shape__text" dangerouslySetInnerHTML={{__html: this.state.content[1] }}></span></div>
          <div className="shape__side"><span className="heading h1 shape__text" dangerouslySetInnerHTML={{__html: this.state.content[2] }}></span></div>
          <div className="shape__side"><span className="heading h1 shape__text" dangerouslySetInnerHTML={{__html: this.state.content[3] }}></span></div>
        </div>
      </div>
    )
  }
}

export default HomeShape

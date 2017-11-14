import React, { Component } from 'react'
import anime from 'animejs'

class Outline extends Component {
  constructor (props) {
    super(props)

    this.state = {
      show: false
    }
  }

  componentDidUpdate () {
    if ((this.props.show !== this.state.show)) {
      this.setState({show: this.props.show})

      if (this.props.show) {
        this.startAnimation()
      }
    }
  }

  startAnimation () {
    this.refs.outline.style.opacity = '';
    this.refs.outline.children[0].style.transform = 'scaleY(0)'
    this.refs.outline.children[0].style.transformOrigin = '50% 100%'

    this.refs.outline.children[1].style.transform = 'scaleX(0)'
    this.refs.outline.children[1].style.transformOrigin = '0% 50%'

    this.refs.outline.children[2].style.transform = 'scaleY(0)'
    this.refs.outline.children[2].style.transformOrigin = '50% 0%'

    this.refs.outline.children[3].style.transform = 'scaleX(0)'
    this.refs.outline.children[3].style.transformOrigin = '100% 50%'

    const timeline = anime.timeline()

    timeline
      .add({
        targets: this.refs.outline.children[0],
        scaleY: 1,
        duration: 400,
        easing: 'linear'
      })
      .add({
        targets: this.refs.outline.children[1],
        scaleX: 1,
        duration: 400,
        easing: 'linear'
      })
      .add({
        targets: this.refs.outline.children[2],
        scaleY: 1,
        duration: 400,
        easing: 'linear'
      })
      .add({
        targets: this.refs.outline.children[3],
        scaleX: 1,
        duration: 400,
        easing: 'linear'
      })
      .add({
        targets: this.refs.outline,
        opacity: 0,
        duration: 400,
        easing: 'linear'
      })
  }

  render () {
    const hidden = this.props.show ? 'block' : 'none'
    const styleFromProps = this.props.outlineStyles
    const styles = Object.assign({...styleFromProps}, {display: hidden})

    return (
      <div className="outline" ref="outline" style={styles}><span></span><span></span><span></span><span></span></div>
    )
  }
}

export default Outline

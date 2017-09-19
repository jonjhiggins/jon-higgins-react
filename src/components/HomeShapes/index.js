import React, { Component } from 'react'
import HomeShape from '../HomeShape'
import Timeout from '../Timeout'

class HomeShapes extends Component {
  constructor (props, options) {
    super(props)

    const DEFAULTS = {
      animationContent: [
        ['', '', ''],
        ['Hi', 'I&rsquo;m', 'Jon Higgins,'],
        ['a', 'front-end', 'developer'],
        ['who', 'loves', 'learning'],
        ['and', 'enjoys', 'experimenting.'],
        ['Is', 'partial to', 'collaboration'],
        ['and', 'first-rate', 'production.']
      ]
    }

    this.settings = Object.assign(DEFAULTS, options)
    this.intervalTimeline = 0

    const is3d = false
    const is3dParent = false
    const highlight = false
    const showSide = 1

    this.state = {
      shapes: [
        {
          is3d,
          is3dParent,
          highlight,
          showSide,
          content: new Array(4) // Shape has 4 sides
        },
        {
          is3d,
          is3dParent,
          highlight,
          showSide,
          content: new Array(4)
        },
        {
          is3d,
          is3dParent,
          highlight,
          showSide,
          content: new Array(4)
        }
      ]
    }
  }

  componentDidMount () {
    // Animate
    this.shapeAnimation()
  }

  componentWillUnmount () {
    clearInterval(this.intervalTimeline)
  }

  rotateShapes (sideNo, delay) {
    const setShape3d = function (shapeIndex) {
      const newState = this.state.shapes.slice()
      newState[shapeIndex]['is3d'] = true
      newState[shapeIndex]['is3dParent'] = true
      this.setState({shapes: newState})
    }

    const unsetShape3d = function (shapeIndex) {
      const newState = this.state.shapes.slice()
      newState[shapeIndex]['is3d'] = false
      this.setState({shapes: newState})
      // Fix Android Chrome layout bug when shapes are flat
      this.props.setTimeout(() => {
        newState[shapeIndex]['is3dParent'] = false
        this.setState({shapes: newState})
      }, 400) // 400ms = transition on shape__side
    }

    const highlight = function (shapeIndex, highlight) {
      const newState = this.state.shapes.slice()
      newState[shapeIndex]['highlight'] = highlight
      this.setState({shapes: newState})
    }

    const updateShapeClasses = function (shapeIndex, sideNo) {
      const newState = this.state.shapes.slice()
      newState[shapeIndex]['showSide'] = sideNo
      this.setState({shapes: newState})
    }

    const showSide = function (shapeIndex, sideNo) {
      // Move forward
      setShape3d.call(this, shapeIndex)
      // Show side
      this.props.setTimeout(updateShapeClasses.bind(this, shapeIndex, sideNo), 100)

      // Highlight text
      this.props.setTimeout(highlight.bind(this, shapeIndex, true), 400)
      this.props.setTimeout(highlight.bind(this, shapeIndex, false), 2400)

      // Move backward
      this.props.setTimeout(unsetShape3d.bind(this, shapeIndex), 500)
    }

    this.props.setTimeout(showSide.bind(this, 0, sideNo), delay + 400)
    this.props.setTimeout(showSide.bind(this, 1, sideNo), delay + 800)
    this.props.setTimeout(showSide.bind(this, 2, sideNo), delay + 1200)
  }

  shapeAnimation () {
    const rotateDelay = 2400
    const sidesTotal = 6
    const sidesStartIndex = 2

    const startTimeline = function () {
      for (let i = 0; i < sidesTotal; i++) {
        this.setContentRotateShapes(sidesStartIndex + i, rotateDelay * i)
      }
    }

    startTimeline.call(this)
    this.intervalTimeline = window.setInterval(startTimeline.bind(this), rotateDelay * (sidesTotal + 1))
  };

  setContentRotateShapes (sideNo, delay) {
    this.setShapeContent(sideNo, delay)
    this.rotateShapes(sideNo, delay)
  };

  setShapeContent (sideNo, delay) {
    // There are only 4 sides to each shape.
    // When sideNo is over 4, replace the 1st side, 2nd side again etc.
    const shapeTextIndex = sideNo - 1
    const actualSideNo = shapeTextIndex % 4

    // Shape sides: set the text content
    this.props.setTimeout(this.shapeItemSetContent.bind(this, shapeTextIndex, actualSideNo), delay + 300)
  };

  // iterate through the 3 shapes, call shapeTextSetContent on each text element
  shapeItemSetContent (shapeTextIndex, actualSideNo) {
    for (const [shapeIndex] of this.state.shapes.entries()) {
      this.shapeTextSetContent(shapeIndex, shapeTextIndex, actualSideNo)
    }
  }
  // Set the content of the text element itself
  shapeTextSetContent (shapeIndex, shapeTextIndex, actualSideNo) {
    const newState = this.state.shapes.slice()
    newState[shapeIndex].content[actualSideNo] = this.settings.animationContent[shapeTextIndex][shapeIndex]
    this.setState({shapes: newState})
  }

  render () {
    return (
      <div className="home__text-animation" ref="homeTextAnimation">
        <HomeShape state={this.state.shapes[0]}/>
        <HomeShape state={this.state.shapes[1]}/>
        <HomeShape state={this.state.shapes[2]}/>
      </div>
    )
  }
}

export default Timeout(HomeShapes)

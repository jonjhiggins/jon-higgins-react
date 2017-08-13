import React, { Component } from 'react'
import HomeShape from '../HomeShape'

class Home extends Component {
  constructor (props) {
    super(props)

    this.animationContent = [
        ['', '', ''],
        ['Hi', 'I&rsquo;m', 'Jon Higgins,'],
        ['a', 'front-end', 'developer'],
        ['who', 'loves', 'learning'],
        ['and', 'enjoys', 'experimenting.'],
        ['Is', 'partial to', 'collaboration'],
        ['and', 'first-rate', 'production.']
    ]

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

    // Disable 3d animation if transform-style: preserve-3d is not available
    this.preserve3dClass = this.detectPreserve3d() ? '' : 'js--preserve-3d-off'
  }

  // https://github.com/Modernizr/Modernizr/blob/master/feature-detects/css/transformstylepreserve3d.js
  detectPreserve3d () {
    const docElement = document.documentElement
    const outerDiv = document.createElement('div')
    const innerDiv = document.createElement('div')

    outerDiv.style.cssText = 'transform-style: preserve-3d; transform-origin: right; transform: rotateY(40deg);'
    innerDiv.style.cssText = 'width: 9px; height: 1px; background: #000; transform-origin: right; transform: rotateY(40deg);'

    outerDiv.appendChild(innerDiv)
    docElement.appendChild(outerDiv)

    const result = innerDiv.getBoundingClientRect()
    docElement.removeChild(outerDiv)

    return result.width && result.width < 4
  }

  componentDidMount () {
    // Fade in content
    // TweenLite.from(this.$shapes, 0.4, {
    //   opacity: 0,
    //   delay: 0.4
    // })

    // Animate
    this.shapeAnimation()
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
      // // Fix Android Chrome layout bug when shapes are flat
      window.setTimeout(() => {
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
      window.setTimeout(updateShapeClasses.bind(this, shapeIndex, sideNo), 100)

      // Highlight text
      window.setTimeout(highlight.bind(this, shapeIndex, true), 400)
      window.setTimeout(highlight.bind(this, shapeIndex, false), 2400)

      // Move backward
      window.setTimeout(unsetShape3d.bind(this, shapeIndex), 500)
    }

    window.setTimeout(showSide.bind(this, 0, sideNo), delay + 400)
    window.setTimeout(showSide.bind(this, 1, sideNo), delay + 800)
    window.setTimeout(showSide.bind(this, 2, sideNo), delay + 1200)
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
    window.setInterval(startTimeline.bind(this), rotateDelay * (sidesTotal + 1))
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
    window.setTimeout(this.shapeItemSetContent.bind(this, shapeTextIndex, actualSideNo), delay + 300)
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
    newState[shapeIndex].content[actualSideNo] = this.animationContent[shapeTextIndex][shapeIndex]
    this.setState({shapes: newState})
  }

  render () {
    return (
      <section className={`home body-text ${this.preserve3dClass}`}>
        <div className="container">
          <div className="home__content home__content--sr">
            <h1>Jon Higgins - a front-end developer based in Melbourne, Australia</h1>
          </div>
          <div className="home__content home__content--animation">
            <div className="home__text-animation">
              <HomeShape state={this.state.shapes[0]}/>
              <HomeShape state={this.state.shapes[1]}/>
              <HomeShape state={this.state.shapes[2]}/>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Home

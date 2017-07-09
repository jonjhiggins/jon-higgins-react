import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  getLinkId (linkId) {
    return linkId.toLowerCase().replace('?', '')
  }
  isActive (linkId) {
    return linkId === this.props.activeLink ? 'active' : ''
  }
  buildNavItems () {
    const navItems = this.props.navigationData.map((item, index) => {
      const linkId = this.getLinkId(item.title)
      const classList = `navigation__link ${this.isActive(linkId)}`
      return (
        <li key={index} className={`navigation__item navigation__item--${linkId}`}>
          <Link to={item.link} className={classList}><span className="navigation__link__text">{item.title}</span></Link>
        </li>
      )
    })
    return navItems
  }
  render () {
    return (
      <nav id="navigation" className="navigation">
        <ul className="navigation__list">{this.buildNavItems()}</ul>
      </nav>
    )
  }
}

export default Navigation

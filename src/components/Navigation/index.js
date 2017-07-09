import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Navigation extends Component {
  buildNavItems () {
    const navItems = this.props.navigationData.map((item, index) => {
      const active = true
      const classList = `navigation__link ${active ? 'active' : ''}`
      return (
        <li key={index} className={`navigation__item navigation__item--${item.title.toLowerCase()}`}>
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

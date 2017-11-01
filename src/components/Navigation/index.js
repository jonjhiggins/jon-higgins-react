import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class Navigation extends Component {
  getLinkId (linkId) {
    return linkId.toLowerCase().replace('?', '')
  }
  buildNavItems () {
    const navItems = this.props.navigationData.map((item, index) => {
      const linkId = this.getLinkId(item.title)
      return (
        <li key={index} className={`navigation__item navigation__item--${linkId}`}>
          <NavLink to={item.link} className="navigation__link" activeClassName="active"><span className="navigation__link__text">{item.title}</span></NavLink>
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

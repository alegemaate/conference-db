import React, { Component } from 'react'
import { Link } from 'react-router-dom'

require('./../stylesheets/nav.css')

export default class App extends Component {
  render() {
    return (
      <header>
        <h1 className="title-1">Conference</h1>
        <h1 className="title-2">Database</h1>
        <div className="triangle"/>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/committee">Committee</Link></li>
            <li><Link to="/rooms">Rooms</Link></li>
            <li><Link to="/schedule">Schedule</Link></li>
            <li><Link to="/sponsors">Sponsors</Link></li>
            <li><Link to="/jobs">Jobs</Link></li>
            <li><Link to="/attendees">Attendees</Link></li>
            <li><Link to="/accounting">Accounting</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}

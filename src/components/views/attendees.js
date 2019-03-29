import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Attendee from '../entities/attendee.js'

const API_PATH = API_ROOT + '/attendee/read.php'

export default class AttendeeView extends Component {
  // Ctor
  constructor(props) {
    super(props)
    this.state = {
      attendees: null
    }
  }

  // Load up sponsors from db
  componentDidMount() {
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const attendees = result.data.body.map(
          att => new Attendee(att)
        )
        this.setState({ attendees })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  // Render sponsors page
  render() {
  	let curr = ''

    return (
      <div id="attendees">
        <h2 className="page-title">Attendees</h2>
        <h2 className="page-title-bottom">Who is coming?</h2>
        {
          // If the sponsors have been loaded, display them
          this.state.attendees &&
          this.state.attendees.map(
          	att => {
          		if (att.state.type_name !== curr) {
          			curr = att.state.type_name
          			return (
          				<div>
	          				<h1>{att.state.type_name}s</h1>
	          				{att.renderAttendee()}
	          			</div>
          			)
          		}
	          	return att.renderAttendee()
	          }
          )
        }
        <br/>
        <Link to="/attendee-add"><button>Add Attendee</button></Link>
      </div>
    )
  }
}

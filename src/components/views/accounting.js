import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import axios from 'axios'

import Attendee from '../entities/attendee.js'
import Sponsor from '../entities/sponsor.js'

const API_PATH_ATTENDEE = API_ROOT + '/attendee/read.php'
const API_PATH_SPONSOR = API_ROOT + '/sponsor/read.php'

export default class AccountingView extends Component {
  // Ctor
  constructor(props) {
    super(props)
    this.state = {
      attendees: null,
      sponsors: null
    }
  }

  // Load up sponsors from db
  componentDidMount() {
    axios({
      method: 'post',
      url: `${API_PATH_ATTENDEE}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const attendees = result.data.body.map(
          att => new Attendee(att)
        )
        this.setState({ attendees })
      })
      .catch(error => this.setState({ error: error.message }))

    axios({
      method: 'post',
      url: `${API_PATH_SPONSOR}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const sponsors = Object.keys(result.data.body).map(
          key => new Sponsor(result.data.body[key])
        )
        this.setState({ sponsors })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  render() {
    return (
      <div id="accounting">
        <h2 className="page-title">Accounting</h2>
        <h2 className="page-title-bottom">How much are we making?</h2>
        {
          // If the sponsors have been loaded, display them
          this.state.attendees &&
          this.state.sponsors &&
          this.fund_calculator(this.state.sponsors, this.state.attendees)
        }
      </div>
    )
  }

  fund_calculator(sponsors, attendees) {
    let sponsor_funds = 0
    let attendee_funds = 0

    attendees.map(att => (
      attendee_funds = attendee_funds + parseInt(att.state.fee, 10)
    ))

    sponsors.map(spn => (
      sponsor_funds = sponsor_funds + parseInt(spn.state.fund_level, 10)
    ))

    return (
      <div>
        <h2>Sponsor Funds</h2>
        <p>${sponsor_funds}</p>

        <h2>Attendee Funds</h2>
        <p>${attendee_funds}</p>

        <h2>Total</h2>
        <p>${attendee_funds + sponsor_funds}</p>
      </div>
    )
  }
}

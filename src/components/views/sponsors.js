import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Sponsor from '../entities/sponsor.js'

const API_PATH = API_ROOT + '/sponsor/read.php'

require('./../../stylesheets/sponsors.css')

// Sponsor view
export default class SponsorView extends Component {
  // Ctor
  constructor(props) {
    super(props)
    this.state = {
      sponsors: []
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
        const sponsors = Object.keys(result.data.body).map(
          key => new Sponsor(result.data.body[key])
        )
        this.setState({ sponsors })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  // Render sponsors page
  render() {
    return (
      <div id="sponsors">
        <h2 className="page-title">Sponsors</h2>
        <h2 className="page-title-bottom">Who is paying for this?</h2>
        <div className="sponsors">
          {
            // If the sponsors have been loaded, display them
            this.state.sponsors &&
            this.state.sponsors.map(spn => (spn.renderSponsor()))
          }
        </div>
        <br/>
        <Link to="/sponsor-add"><button>Add Sponsor</button></Link>
        <Link to="/sponsor-remove"><button>Remove Sponsor</button></Link>
      </div>
    )
  }
}

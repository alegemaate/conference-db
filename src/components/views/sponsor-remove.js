import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import Sponsor from '../entities/sponsor.js'

const API_PATH_READ = API_ROOT + '/sponsor/read.php'
const API_PATH_DELETE = API_ROOT + '/sponsor/delete.php'

export default class SponsorRemoveView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sponsor_id: null,
      sponsors: null,
      message: ''
    }
  }

  // Read sponsors
  readSponsors() {
  	axios({
      method: 'post',
      url: `${API_PATH_READ}`,
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

  // Load up sponsors from db
  componentDidMount() {
    this.readSponsors()
  }

  handleFormSubmit = e => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${API_PATH_DELETE}`,
      headers: { 'content-type': 'application/json' },
      data: { spn_id: this.state.sponsor_id }
    })
      .then(result => {
        this.setState({
          message: result.data.message
        })
        this.readSponsors()
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render() {
    return (
      <div id="sponsor-add">
        <h2 className="page-title">Sponsors</h2>
        <h2 className="page-title-bottom">Remove a sponsor</h2>
        <form action="#" >
          <label>Name</label>
          <select type="text"
            onChange={
              e => this.setState({
                sponsor_id: parseInt(e.target.value, 10)
              })
            }
          >
            <option value="" disabled selected hidden> - Select a sponsor - </option>
            {
	            // If the sponsors have been loaded, display them
	            this.state.sponsors &&
	            this.state.sponsors.map(spn => (spn.renderSelect()))
	          }
          </select>
          <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
          <Link to="/sponsors"><button>Back</button></Link>
        </form>
        {
          this.state.message &&
          <p>{this.state.message}</p>
        }
        {
          this.state.error &&
          <p>There was an error: {this.state.error}</p>
        }
      </div>
    )
  }
}

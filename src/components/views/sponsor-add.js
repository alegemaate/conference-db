import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const API_PATH_SPONSOR = API_ROOT + '/sponsor/create.php'
const API_PATH_SPONSOR_TIER = API_ROOT + '/sponsor_tier/read.php'

// Stores attendees
class SponsorTier extends Component {
  // Ctor
  constructor(props) {
    super(props)

    this.state = {
      id: props.tier_id,
      name: props.name,
      fund_level: props.fund_level,
      emails_allowed: props.emails_allowed
    }
  }

  // Render sponsor
  renderSelect() {
    return (
      <option
        key={this.state.id}
        value={this.state.id}
      >
        {this.state.name} - ${this.state.fund_level}
      </option>
    )
  }
}


export default class SponsorAddView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      tier_id: '',
      message: null,
      error: null,
      tiers: null
    }
  }

  // Load up sponsor tiers from db
  componentDidMount() {
    // Get tiers
    axios({
      method: 'post',
      url: `${API_PATH_SPONSOR_TIER}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const tiers = result.data.body.map(
          tier => new SponsorTier(tier)
        )
        this.setState({ tiers })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  handleFormSubmit = e => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${API_PATH_SPONSOR}`,
      headers: { 'content-type': 'application/json' },
      data: this.state
    })
      .then(result => {
        this.setState({
          message: result.data.message
        })
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
        <h2 className="page-title-bottom">Add a sponsor</h2>
        <form action="#" >
          <label>Name</label>
          <input
            type="text"
            placeholder="Company name.."
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />

          <label>Tier</label>
          <select type="text"
            onChange={
              e => this.setState({
                tier_id: parseInt(e.target.value, 10)
              })
            }
          >
            <option value="" disabled selected hidden> - Select a tier - </option>
            {
              this.state.tiers &&
              this.state.tiers.map(tier => (tier.renderSelect()))
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

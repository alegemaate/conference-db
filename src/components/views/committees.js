import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import axios from 'axios'

import Committee from '../entities/committee.js'

const API_PATH = API_ROOT + '/committee/read.php'


export default class CommitteeView extends Component {
  // Ctor
  constructor(props) {
    super(props)
    this.state = {
      selectedCommittee: null,
      committees: [],
      error: null
    }
  }

  // Load up committees
  componentDidMount() {
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const committees = Object.keys(result.data.body).map(
          key => new Committee(result.data.body[key])
        )
        this.setState({ committees })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  // Render page
  render() {
    return (
      <div className="Comittee">
        <h2 className="page-title">Committees</h2>
        <h2 className="page-title-bottom">Who planned this?</h2>
        <div>
          <form action="#">
            <label>Select a committee to view</label>

            <select id="committee" name="committee"
              onChange={
                e => this.setState(
                  {
                    selectedCommittee: this.selectCommittee(e.target.value, 10)
                  }
                )
              }
            >
              <option value="" disabled selected hidden> - Select a committee - </option>
              {
                // If the committee names have been received display them
                this.state.committees &&
                this.state.committees.map(com => (com.renderSelect()))
              }
            </select>
            <div>
              {
                this.state.error &&
                <div className="error">Sorry, an error occured. ({this.state.error})</div>
              }
            </div>
          </form>
        </div>
        {
          // If the committee names have been received display them
          this.state.selectedCommittee &&
          <div>
            <h2>{this.state.selectedCommittee.state.name}</h2>
            <div className="result">
              <ul>
                {
                  this.state.selectedCommittee.renderMembers()
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }

  selectCommittee(id) {
    return this.state.committees.find(
      function (com) {
        return com.state.id == id
      }
    )
  }
}

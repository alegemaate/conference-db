import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

require('./../../stylesheets/calendar.css')

const API_PATH = API_ROOT + 'session/read.php'
const API_PATH_UPDATE = API_ROOT + 'session/update.php'

// Scheduling
export default class ScheduleModifyView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      events: [],
      selectedEvent: null,
      start: null,
      end: null,
      date: null
    }
  }

  // Load up events from db
  componentDidMount() {
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const events = result.data.body.map(
          key => ({
            id: key.ses_id,
            start: moment(key.date + ' ' + key.start_time),
            end: moment(key.date + ' ' + key.end_time),
            value: key.name,
            name: key.name,
            building: key.building
          })
        )
        this.setState({ events })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  handleFormSubmit = e => {
    e.preventDefault()
    axios({
      method: 'post',
      url: `${API_PATH_UPDATE}`,
      headers: { 'content-type': 'application/json' },
      data: {
        id: this.state.selectedEvent.id,
        start: this.state.start,
        end: this.state.end,
        date: this.state.date
      }
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
      <div id="schedule">
        <h2 className="page-title">Schedule</h2>
        <h2 className="page-title-bottom">Modify event</h2>

        <form action="#" >
          <label>Select event</label>

          <select
            id="room"
            name="room"
            onChange={
              e => this.setState(
                {
                  selectedEvent: this.selectEvent(e.target.value),
                  date: this.selectEvent(e.target.value).start.format('YYYY-MM-DD'),
                  end: this.selectEvent(e.target.value).end.format('H:mm:ss'),
                  start: this.selectEvent(e.target.value).start.format('H:mm:ss')
                }
              )
            }
          >
            <option value="" selected disabled hidden> - Select event to modify - </option>
            {
              this.state.events.map(sess => {
                return <option key={sess.id} value={sess.id}>{sess.name}</option>
              })
            }
          </select>

          {
            this.state.selectedEvent &&
            <div>
              <label>Start time</label>
              <input
                type="time"
                name="start_time"
                value={this.state.start}
                onChange={
                  e => this.setState(
                    {
                      start: e.target.value
                    }
                  )
                }
              />

              <label>End time</label>
              <input
                type="time"
                name="end_time"
                value={this.state.end}
                onChange={
                  e => this.setState(
                    {
                      end: e.target.value
                    }
                  )
                }
              />

              <label>Date</label>
              <input
                type="date"
                name="date"
                value={this.state.date}
                onChange={
                  e => this.setState(
                    {
                      date: e.target.value
                    }
                  )
                }
              />

              <br/>

              <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Submit" />
              <Link to="/schedule"><button>Back</button></Link>
            </div>
          }
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

  // Select event
  selectEvent(id) {
    return this.state.events.find(
      function (ev) {
        return ev.id == id
      }
    )
  }
}

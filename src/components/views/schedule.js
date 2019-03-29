import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import WeekCalendar from 'react-week-calendar'

require('./../../stylesheets/calendar.css')

const API_PATH = API_ROOT + '/session/read.php'

// Scheduling
export default class ScheduleView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstDay: moment('2019-01-01'),
      cellHeight: 50,
      useModal: false,
      startTime: moment({ h: 8, m: 0 }),
      endTime: moment({ h: 22, m: 59 }),
      scaleFormat: 'hh:mm A',
      eventSpacing: 15,
      numberOfDays: 3,
      scaleUnit: 30,
      dayFormat: 'DD/MM',
      selectedIntervals: []
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
        const selectedIntervals = result.data.body.map(
          key => ({
            uid: key.id,
            start: moment(key.date + ' ' + key.start_time),
            end: moment(key.date + ' ' + key.end_time),
            value: key.name
          })
        )
        console.log(selectedIntervals)
        this.setState({ selectedIntervals })
      })
      .catch(error => this.setState({ error: error.message }))
  }


  render() {
    let { ...config } = this.state

    return (
      <div id="schedule">
        <h2 className="page-title">Schedule</h2>
        <h2 className="page-title-bottom">What is going on?</h2>
        <WeekCalendar
          { ...config }
        />
        <br/>
        <Link to="/schedule-change"><button>Modify schedule</button></Link>
      </div>
    )
  }
}

import { API_ROOT } from './../api-config'
import React, { Component } from 'react'
import axios from 'axios'

import Room from '../entities/room.js'

const API_PATH = API_ROOT + '/room/read.php'

export default class RoomView extends Component {
  // Ctor
  constructor(props) {
    super(props)
    this.state = {
      selectedRoom: null,
      rooms: [],
      error: null
    }
  }

  // Load up committee names
  componentDidMount() {
    axios({
      method: 'post',
      url: `${API_PATH}`,
      headers: { 'content-type': 'application/json' }
    })
      .then(result => {
        const rooms = Object.keys(result.data.body).map(
          key => new Room(result.data.body[key])
        )
        this.setState({ rooms })
      })
      .catch(error => this.setState({ error: error.message }))
  }

  // Render page
  render() {
    return (
      <div className="Rooms">
        <h2 className="page-title">Room Occupants</h2>
        <h2 className="page-title-bottom">Who is staying where?</h2>
        <div>
          <form action="#">
            <label>Room</label>

            <select id="room" name="room"
              onChange={
                e => this.setState(
                  {
                    selectedRoom: this.selectRoom(e.target.value, 10)
                  }
                )
              }
            >
              <option value="" disabled selected hidden> - Select a room - </option>
              {
                // If the committee names have been received display them
                this.state.rooms &&
                this.state.rooms.map(rm => (rm.renderSelect()))
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
          // Have we received a list of members?
          this.state.selectedRoom &&
          <div>
            <h2>Occupants</h2>
            <div className="result">
              <ul>
                {
                  this.state.selectedRoom.renderOccupants()
                }
              </ul>
            </div>
          </div>
        }
      </div>
    )
  }

  // Select room
  selectRoom(id) {
    return this.state.rooms.find(
      function (rm) {
        return rm.state.id == id
      }
    )
  }
}

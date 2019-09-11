import { API_ROOT } from "./../api-config";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import Room from "../entities/room.js";

const API_PATH_ATTENDEE = API_ROOT + "/attendee/create.php";
const API_PATH_TYPE = API_ROOT + "/attendee_type/read.php";
const API_PATH_ROOM = API_ROOT + "/room/read.php";

// Stores attendees
class AttendeeType extends Component {
  // Ctor
  constructor(props) {
    super(props);

    this.state = {
      id: props.att_type_id,
      name: props.type_name,
      fee: props.fee
    };
  }

  // Render sponsor
  renderSelect() {
    return (
      <option key={this.state.id} value={this.state.id}>
        {this.state.name} - ${this.state.fee}
      </option>
    );
  }
}

export default class AttendeeAddView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      type_id: "",
      room_id: "null",
      rooms: null,
      attendee_types: null,
      error: null
    };
  }

  componentDidMount() {
    // Get types
    axios({
      method: "post",
      url: `${API_PATH_TYPE}`,
      headers: { "content-type": "application/json" }
    })
      .then(result => {
        const attendee_types = result.data.body.map(
          tier => new AttendeeType(tier)
        );
        this.setState({ attendee_types });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  }

  handleFormSubmit = e => {
    e.preventDefault();
    axios({
      method: "post",
      url: `${API_PATH_ATTENDEE}`,
      headers: { "content-type": "application/json" },
      data: {
        name: this.state.name,
        email: this.state.email,
        type_id: this.state.type_id,
        room_id: this.state.room_id
      }
    })
      .then(result => {
        this.setState({
          message: result.data.message
        });
      })
      .catch(error => {
        this.setState({
          error: error.message
        });
      });
  };

  render() {
    return (
      <div id="sponsor-add">
        <h2 className="page-title">Add attendee</h2>
        <h2 className="page-title-bottom">Wicked</h2>
        <form action="#">
          <label>Name</label>
          <input
            type="text"
            placeholder="Attendee name.."
            value={this.state.name}
            onChange={e => this.setState({ name: e.target.value })}
          />

          <label>Email</label>
          <input
            type="email"
            placeholder="Attendee email.."
            value={this.state.email}
            onChange={e => this.setState({ email: e.target.value })}
          />

          <label>Attendee Type</label>
          <select
            type="text"
            onChange={e => {
              this.updateRoomSelector(e.target.value);
              this.setState({
                type_id: parseInt(e.target.value, 10)
              });
            }}
          >
            <option value="" disabled selected hidden>
              {" "}
              - Select an attendee type -{" "}
            </option>
            {this.state.attendee_types &&
              this.state.attendee_types.map(tier => tier.renderSelect())}
          </select>

          {this.state.rooms && (
            <div>
              <label>Select Room</label>
              <select
                id="room"
                name="room"
                onChange={e =>
                  this.setState({
                    room_id: parseInt(e.target.value, 10)
                  })
                }
              >
                <option value="" disabled selected hidden>
                  {" "}
                  - Select a room -{" "}
                </option>
                <option value="null">No room</option>
                {// If the committee names have been received display them
                this.state.rooms &&
                  this.state.rooms.map(rm => rm.renderSelect())}
              </select>
            </div>
          )}

          <input
            type="submit"
            onClick={e => this.handleFormSubmit(e)}
            value="Submit"
          />
          <Link to="/attendees">
            <button>Back</button>
          </Link>
        </form>
        {this.state.message && <p>{this.state.message}</p>}
        {this.state.error && <p>There was an error: {this.state.error}</p>}
      </div>
    );
  }

  updateRoomSelector(val) {
    if (val === "1") {
      this.loadRooms();
    } else {
      this.setState({
        rooms: null,
        room_id: "null"
      });
    }
  }

  loadRooms() {
    // Get rooms
    axios({
      method: "post",
      url: `${API_PATH_ROOM}`,
      headers: { "content-type": "application/json" }
    })
      .then(result => {
        const rooms = Object.keys(result.data.body).map(key => {
          return new Room(result.data.body[key]);
        });
        this.setState({ rooms });
      })
      .catch(error => this.setState({ error: error.message }));
  }
}

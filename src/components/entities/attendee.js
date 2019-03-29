import React, { Component } from 'react'

// Stores attendees
export default class Attendee extends Component {
  // Ctor
  constructor(props) {
    super(props)

    this.state = {
      id: props.att_id,
      room_id: props.room_id,
      name: props.name,
      email: props.email,
      type_name: props.type_name,
      fee: props.fee
    }
  }

  // Render sponsor
  renderAttendee() {
    return (
      <div
        key={this.state.id}
        className={'attendee ' + this.state.name}
      >
        {this.state.name}
      </div>
    )
  }
}

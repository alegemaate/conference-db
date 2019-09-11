import React, { Component } from "react";

// Stores rooms
export default class Room extends Component {
  // Ctor
  constructor(props) {
    super(props);

    this.state = {
      building: props.building,
      id: props.room_id,
      number: props.room_number,
      capacity: props.capacity,
      occupants: props.occupants
    };
  }

  // Render select
  renderSelect() {
    return (
      this.state.capacity > 0 && (
        <option key={this.state.id} value={this.state.id}>
          {this.state.building} - {this.state.number}
        </option>
      )
    );
  }

  // Render occupant
  renderOccupant(occupant) {
    return (
      <li key={occupant.name} className="member">
        {occupant.name}
      </li>
    );
  }

  // Render select
  renderOccupants() {
    return (
      <div>
        <li>
          Capacity at {this.state.occupants.length} / {this.state.capacity}
        </li>
        {this.state.occupants.map(occ => this.renderOccupant(occ))}
      </div>
    );
  }
}

import React, { Component } from "react";

import Icon from "react-icons-kit";
import { ic_stars } from "react-icons-kit/md/ic_stars";

// Stores committees
export default class Committee extends Component {
  // Ctor
  constructor(props) {
    super(props);

    this.state = {
      name: props.com_name,
      id: props.com_id,
      chair_id: props.chair_id,
      members: props.members
    };
  }

  // Render member
  renderMember(member) {
    // They are the chair, how special
    if (this.state.chair_id === member.mem_id) {
      return (
        <li title="chair" key={member.mem_id} className="member chair">
          <Icon icon={ic_stars} />
          {member.mem_name}
        </li>
      );
    }

    // Just a regular member
    return (
      <li key={member.mem_id} className="member">
        {member.mem_name}
      </li>
    );
  }

  // Render select
  renderMembers() {
    return this.state.members.map(mem => this.renderMember(mem));
  }
}

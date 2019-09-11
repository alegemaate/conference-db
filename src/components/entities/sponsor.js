import React, { Component } from "react";

// Stores sponsors
export default class Sponsor extends Component {
  // Ctor
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      id: props.spn_id,
      tier_id: props.tier_id,
      emails_sent: props.emails_sent,
      emails_allowed: props.emails_allowed,
      tier_name: props.tier_name,
      fund_level: props.fund_level,
      jobs: []
    };
  }

  // Render sponsor
  renderSponsor() {
    return (
      <div
        key={this.state.id}
        className={"sponsor " + this.state.tier_name.toLowerCase()}
      >
        {this.state.name}
      </div>
    );
  }

  // Render sponsor select
  renderSelect() {
    return (
      <option key={this.state.id} value={this.state.id}>
        {this.state.name}
      </option>
    );
  }

  // Render sponsor jobs
  renderJobs() {
    if (this.state.jobs.length !== 0) {
      return this.state.jobs.map(job => job.renderJob());
    }
    return (
      <div className="job">
        <p>No jobs posted</p>
      </div>
    );
  }
}

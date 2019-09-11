import { API_ROOT } from "./../api-config";
import React, { Component } from "react";
import axios from "axios";

import Sponsor from "../entities/sponsor.js";

const JOBS_API_PATH = API_ROOT + "/job/read.php";
const SPONSORS_API_PATH = API_ROOT + "/sponsor/read.php";

// Stores Jobs
class Job extends Component {
  // Ctor
  constructor(props) {
    super(props);

    this.state = {
      job_id: props.job_id,
      spn_id: props.spn_id,
      title: props.title,
      city: props.city,
      province: props.province,
      pay_rate: props.pay_rate
    };
  }

  // Render member
  renderJob() {
    return (
      <div key={this.state.job_id} className={"job"}>
        {this.state.title} - {this.state.city},{this.state.province} ($
        {this.state.pay_rate})
      </div>
    );
  }
}

// Job view
export default class JobView extends Component {
  // Ctor
  constructor(props) {
    super(props);
    this.state = {
      jobs: null,
      sponsors: null,
      error: null
    };
  }

  // Load up committees
  componentDidMount() {
    // Get sponsors
    axios({
      method: "post",
      url: `${SPONSORS_API_PATH}`,
      headers: { "content-type": "application/json" }
    })
      .then(result => {
        const sponsors = result.data.body.map(key => new Sponsor(key));
        this.setState({ sponsors });
      })
      .catch(error => this.setState({ error: error.message }));

    // Get jobs
    axios({
      method: "post",
      url: `${JOBS_API_PATH}`,
      headers: { "content-type": "application/json" }
    })
      .then(result => {
        const jobs = result.data.body.map(key => new Job(key));
        this.setState({ jobs });
      })
      .catch(error => this.setState({ error: error.message }));
  }

  render() {
    return (
      <div id="jobs">
        <h2 className="page-title">Jobs</h2>
        <h2 className="page-title-bottom">Who is hiring?</h2>
        {this.state.sponsors && this.state.jobs && (
          <div>
            <h3>Jobs by sponsor</h3>
            <div className="sponsors">
              {// Link jobs to sponsors
              this.state.sponsors.forEach(sponsor => {
                this.state.jobs.forEach(job => {
                  if (sponsor.state.id === job.state.spn_id) {
                    sponsor.state.jobs.push(job);
                  }
                });
              })}
              {// Display sponsors jobs
              this.state.sponsors.map(sponsor => {
                return (
                  <div key={sponsor.state.id}>
                    {sponsor.renderSponsor()}
                    {sponsor.renderJobs()}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {this.state.jobs && (
          <div>
            <h3>All Jobs</h3>
            <div className="sponsors">
              {this.state.jobs.map(job => job.renderJob())}
            </div>
          </div>
        )}
      </div>
    );
  }
}

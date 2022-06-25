import React, { useEffect, useState } from "react";

import Sponsor from "../entities/sponsor.js";
import Job from "../entities/job.js";

import DbClient from "../components/DbClient";
import { API_PATH_SPONSOR, API_PATH_JOB } from "../constants/endpoints";

// Job view
export default function JobView() {
  // State
  const [jobs, setJobs] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState("");

  // Load up committees and jobs
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body: sponsors } = await db.post(API_PATH_SPONSOR);
        setSponsors(sponsors.map((sponsor) => new Sponsor(sponsor)));

        const { body: jobs } = await db.post(API_PATH_JOB);
        setJobs(jobs.map((job) => new Job(job)));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  return (
    <div id="jobs">
      <h2 className="page-title">Jobs</h2>
      <h2 className="page-title-bottom">Who is hiring?</h2>
      <div>
        <h3>Jobs by sponsor</h3>
        <div className="sponsors">
          {
            // Link jobs to sponsors
            sponsors.forEach((sponsor) => {
              jobs.forEach((job) => {
                if (sponsor.id === job.spn_id) {
                  sponsor.jobs.push(job);
                }
              });
            })
          }
          {
            // Display sponsors jobs
            sponsors.map(({ id, tier_name, name, jobs }) => (
              <div key={id}>
                <div key={id} className={"sponsor " + tier_name.toLowerCase()}>
                  {name}
                </div>
                {jobs.length > 0 ? (
                  jobs.map(({ job_id, province, title, pay_rate, city }) => (
                    <div key={job_id} className={"job"}>
                      {title} - {city},{province} ($
                      {pay_rate})
                    </div>
                  ))
                ) : (
                  <div className="job">
                    <p>No jobs posted</p>
                  </div>
                )}
              </div>
            ))
          }
        </div>
      </div>

      {jobs && (
        <div>
          <h3>All Jobs</h3>
          <div className="sponsors">
            {jobs.map(({ job_id, province, title, pay_rate, city }) => (
              <div key={job_id} className={"job"}>
                {title} - {city},{province} ($
                {pay_rate})
              </div>
            ))}
          </div>
        </div>
      )}

      {error && <div className="error">Sorry, an error occured. ({error})</div>}
    </div>
  );
}

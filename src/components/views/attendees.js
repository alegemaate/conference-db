import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Attendee from "../entities/attendee.js";

import DbClient from "../DbClient";
import { API_PATH_ATTENDEE } from "../../constants/endpoints";

export default function AttendeeView() {
  // State
  const [attendees, setAttendees] = useState([]);
  const [error, setError] = useState("");

  // Load up sponsors from db
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_ATTENDEE);
        setAttendees(body.map(att => new Attendee(att)));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  // Render sponsors page
  let curr = "";

  return (
    <div id="attendees">
      <h2 className="page-title">Attendees</h2>
      <h2 className="page-title-bottom">Who is coming?</h2>
      {attendees.map(({ type_name, id, name }) => {
        if (type_name !== curr) {
          curr = type_name;
          return (
            <React.Fragment key={id}>
              <h1>{type_name}s</h1>
              <div key={id} className={"attendee " + name}>
                {name}
              </div>
            </React.Fragment>
          );
        }
        return (
          <div key={id} className={"attendee " + name}>
            {name}
          </div>
        );
      })}
      <br />
      <Link to="/attendee-add">
        <button>Add Attendee</button>
      </Link>
      <div>
        {error && (
          <div className="error">Sorry, an error occured. ({error})</div>
        )}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import WeekCalendar from "react-week-calendar";

import "../../stylesheets/calendar.css";

import DbClient from "../DbClient";
import {
  API_PATH_SESSION,
  API_PATH_SESSION_UPDATE
} from "../../constants/endpoints";

// Scheduling
export default function ScheduleModifyView() {
  // State
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);
  const [date, setDate] = useState(null);

  // Load up events from db
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_SESSION);
        setEvents(
          body.map(
            ({ ses_id, date, start_time, end_time, name, building }) => ({
              id: ses_id,
              start: moment(date + " " + start_time),
              end: moment(date + " " + end_time),
              value: name,
              name,
              building: building
            })
          )
        );
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  // Select event
  function selectEvent(id) {
    const event = events.find(ev => ev.id == id);
    if (event) {
      setSelectedEvent(event);
      setDate(event.start.format("YYYY-MM-DD"));
      setEnd(event.end.format("H:mm:ss"));
      setStart(event.start.format("H:mm:ss"));
    }
  }

  // Modify event
  function handleFormSubmit(e) {
    e.preventDefault();

    async function fetch() {
      const db = new DbClient();

      try {
        const { message } = await db.post(API_PATH_SESSION_UPDATE, {
          id: selectedEvent.id,
          start,
          end,
          date
        });
        setMessage(message);
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }

  return (
    <div id="schedule">
      <h2 className="page-title">Schedule</h2>
      <h2 className="page-title-bottom">Modify event</h2>

      <form action="#">
        <label>Select event</label>

        <select
          id="room"
          name="room"
          defaultValue=""
          onChange={e => selectEvent(e.target.value)}
        >
          <option value="" disabled hidden>
            {" - Select event to modify - "}
          </option>
          {events.map(({ id, name }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>

        {selectedEvent && (
          <div>
            <label>Start time</label>
            <input
              type="time"
              name="start_time"
              value={start}
              onChange={e => setStart(e.target.value)}
            />

            <label>End time</label>
            <input
              type="time"
              name="end_time"
              value={end}
              onChange={e => setEnd(e.target.value)}
            />

            <label>Date</label>
            <input
              type="date"
              name="date"
              value={date}
              onChange={e => setDate(e.target.value)}
            />

            <br />

            <input
              type="submit"
              onClick={e => handleFormSubmit(e)}
              value="Submit"
            />

            <Link to="/schedule">
              <button>Back</button>
            </Link>
          </div>
        )}
      </form>
      {message && <p>{message}</p>}
      {error && <p>There was an error: {error}</p>}
    </div>
  );
}

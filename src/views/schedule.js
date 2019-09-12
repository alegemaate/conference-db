import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import WeekCalendar from "react-week-calendar";

import "../stylesheets/calendar.css";

import DbClient from "../components/DbClient";
import { API_PATH_SESSION } from "../constants/endpoints";

// Scheduling
export default function ScheduleView() {
  // State
  const [selectedIntervals, setSelectedIntervals] = useState([]);
  const [error, setError] = useState("");

  // Config for calendar
  const calenderConfig = {
    firstDay: moment("2019-01-01"),
    cellHeight: 50,
    useModal: false,
    startTime: moment({ h: 8, m: 0 }),
    endTime: moment({ h: 22, m: 59 }),
    scaleFormat: "hh:mm A",
    eventSpacing: 15,
    numberOfDays: 3,
    scaleUnit: 30,
    dayFormat: "DD/MM"
  };

  // Load up schedule
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_SESSION);
        setSelectedIntervals(
          body.map(({ ses_id, date, start_time, end_time, name }) => ({
            uid: ses_id,
            start: moment(date + " " + start_time),
            end: moment(date + " " + end_time),
            value: name
          }))
        );
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  return (
    <div id="schedule">
      <h2 className="page-title">Schedule</h2>
      <h2 className="page-title-bottom">What is going on?</h2>
      <WeekCalendar {...calenderConfig} selectedIntervals={selectedIntervals} />
      <br />
      <Link to="/schedule-change">
        <button>Modify schedule</button>
      </Link>
      <div>
        {error && (
          <div className="error">Sorry, an error occured. ({error})</div>
        )}
      </div>
    </div>
  );
}

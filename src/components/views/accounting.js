import React, { useEffect, useState } from "react";

import Attendee from "../entities/attendee";
import Sponsor from "../entities/sponsor";

import DbClient from "../DbClient";
import { API_PATH_ATTENDEE, API_PATH_SPONSOR } from "../../constants/endpoints";

export default function AccountingView() {
  // State
  const [attendees, setAttendees] = useState([]);
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState("");

  // Load up sponsors from db
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        // Attendees
        const { body: attendees } = await db.post(API_PATH_ATTENDEE);
        setAttendees(attendees.map(att => new Attendee(att)));

        // Sponsors
        const { body: sponsors } = await db.post(API_PATH_SPONSOR);
        setSponsors(
          Object.keys(sponsors).map(key => new Sponsor(sponsors[key]))
        );
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  function calculateFunds(sponsors, attendees) {
    const attendeeFunds = attendees.reduce(
      (acc, { fee }) => acc + parseInt(fee, 10),
      0
    );

    const sponsorFunds = sponsors.reduce(
      (acc, spn) => acc + parseInt(spn.state.fund_level, 10),
      0
    );

    return (
      <div>
        <h2>Sponsor Funds</h2>
        <p>${sponsorFunds}</p>

        <h2>Attendee Funds</h2>
        <p>${attendeeFunds}</p>

        <h2>Total</h2>
        <p>${attendeeFunds + sponsorFunds}</p>
      </div>
    );
  }

  return (
    <div id="accounting">
      <h2 className="page-title">Accounting</h2>
      <h2 className="page-title-bottom">How much are we making?</h2>
      {// If the sponsors have been loaded, display them
      calculateFunds(sponsors, attendees)}
      <div>
        {error && (
          <div className="error">Sorry, an error occured. ({error})</div>
        )}
      </div>
    </div>
  );
}

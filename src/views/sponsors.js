import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sponsor from "../entities/sponsor.js";

import DbClient from "../components/DbClient";
import { API_PATH_SPONSOR } from "../constants/endpoints";

import "../stylesheets/sponsors.css";

// Sponsor view
export default function SponsorView() {
  // State
  const [sponsors, setSponsors] = useState([]);
  const [error, setError] = useState("");

  // Load up sponsors
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_SPONSOR);
        setSponsors(Object.keys(body).map(key => new Sponsor(body[key])));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  // Render sponsors page
  return (
    <div id="sponsors">
      <h2 className="page-title">Sponsors</h2>
      <h2 className="page-title-bottom">Who is paying for this?</h2>
      <div className="sponsors">
        {// Display sponsors
        sponsors.map(({ id, name, tier_name }) => (
          <div key={id} className={"sponsor " + tier_name.toLowerCase()}>
            {name}
          </div>
        ))}
      </div>
      <br />
      <Link to="/sponsor-add">
        <button>Add Sponsor</button>
      </Link>
      <Link to="/sponsor-remove">
        <button>Remove Sponsor</button>
      </Link>
      <div>
        {error && (
          <div className="error">Sorry, an error occured. ({error})</div>
        )}
      </div>
    </div>
  );
}

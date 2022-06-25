import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Sponsor from "../entities/sponsor.js";

import DbClient from "../components/DbClient";
import {
  API_PATH_SPONSOR,
  API_PATH_SPONSOR_DELETE,
} from "../constants/endpoints";

export default function SponsorRemoveView() {
  // State
  const [sponsors, setSponsors] = useState([]);
  const [sponsorId, setSponsorId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Read sponsors
  async function readSponsors() {
    const db = new DbClient();

    try {
      const { body } = await db.post(API_PATH_SPONSOR);
      setSponsors(Object.keys(body).map((key) => new Sponsor(body[key])));
    } catch (error) {
      setError(error.message);
    }
  }

  // Inital read
  useEffect(() => {
    readSponsors();
  }, []);

  // Submit
  async function handleFormSubmit(e) {
    e.preventDefault();
    const db = new DbClient();
    try {
      const { message } = await db.post(API_PATH_SPONSOR_DELETE, {
        spn_id: sponsorId,
      });
      setMessage(message);
      await readSponsors();
    } catch (error) {
      setError(error.message);
    }
  }

  // Render
  return (
    <div id="sponsor-add">
      <h2 className="page-title">Sponsors</h2>
      <h2 className="page-title-bottom">Remove a sponsor</h2>
      <form action="#">
        <label>Name</label>
        <select
          type="text"
          defaultValue=""
          onChange={(e) => setSponsorId(parseInt(e.target.value, 10))}
        >
          <option value="" disabled hidden>
            {" - Select a sponsor - "}
          </option>
          {
            // Display sponsors
            sponsors.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))
          }
        </select>
        <input
          type="submit"
          onClick={(e) => handleFormSubmit(e)}
          value="Submit"
        />
        <Link to="/sponsors">
          <button>Back</button>
        </Link>
      </form>
      {message && <p>{message}</p>}
      {error && <p>There was an error: {error}</p>}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import SponsorTier from "../entities/sponsor-tier.js";

import DbClient from "../components/DbClient";
import {
  API_PATH_SPONSOR_CREATE,
  API_PATH_SPONSOR_TIER
} from "../constants/endpoints";

export default function SponsorAddView() {
  // State
  const [tiers, setTiers] = useState([]);
  const [tierId, setTierId] = useState(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Load up sponsor tiers
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_SPONSOR_TIER);
        setTiers(body.map(tier => new SponsorTier(tier)));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();

    const db = new DbClient();

    try {
      const { message } = await db.post(API_PATH_SPONSOR_CREATE, {
        tier_id: tierId,
        name
      });
      setMessage(message);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div id="sponsor-add">
      <h2 className="page-title">Sponsors</h2>
      <h2 className="page-title-bottom">Add a sponsor</h2>
      <form action="#">
        <label>Name</label>
        <input
          type="text"
          placeholder="Company name.."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Tier</label>
        <select
          type="text"
          defaultValue=""
          onChange={e => setTierId(parseInt(e.target.value, 10))}
        >
          <option value="" disabled hidden>
            {" - Select a tier - "}
          </option>
          {tiers.map(({ id, name, fund_level }) => (
            <option key={id} value={id}>
              {name} - ${fund_level}
            </option>
          ))}
        </select>

        <input
          type="submit"
          onClick={e => handleFormSubmit(e)}
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

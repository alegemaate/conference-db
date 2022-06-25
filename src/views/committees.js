import React, { useEffect, useState } from "react";

import Committee from "../entities/committee.js";

import DbClient from "../components/DbClient";
import { API_PATH_COMMITTEE } from "../constants/endpoints";

import Icon from "react-icons-kit";
import { ic_stars } from "react-icons-kit/md/ic_stars";

export default function CommitteeView() {
  // State
  const [selectedCommittee, setSelectedCommittee] = useState(null);
  const [committees, setCommittees] = useState([]);
  const [error, setError] = useState("");

  // Load up committees
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_COMMITTEE);
        setCommittees(Object.keys(body).map((key) => new Committee(body[key])));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  // Select a given committee
  function selectCommittee(id) {
    return committees.find((com) => com.id === parseInt(id));
  }

  // Render page

  return (
    <div className="Comittee">
      <h2 className="page-title">Committees</h2>
      <h2 className="page-title-bottom">Who planned this?</h2>
      <div>
        <form action="#">
          <label>Select a committee to view</label>

          <select
            id="committee"
            name="committee"
            defaultValue=""
            onChange={(e) =>
              setSelectedCommittee(selectCommittee(e.target.value))
            }
          >
            <option value="" disabled hidden>
              {" - Select a committee - "}
            </option>
            {
              // Render committees list
              committees.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))
            }
          </select>
          <div>
            {error && (
              <div className="error">Sorry, an error occured. ({error})</div>
            )}
          </div>
        </form>
      </div>
      {
        // If the committee names have been received display them
        selectedCommittee && (
          <div>
            <h2>{selectedCommittee.name}</h2>
            <div className="result">
              <ul>
                {selectedCommittee.members.map((member) => {
                  // They are the chair, how special
                  if (selectedCommittee.chair_id === member.mem_id) {
                    return (
                      <li
                        title="chair"
                        key={member.mem_id}
                        className="member chair"
                      >
                        <Icon icon={ic_stars} />
                        {member.mem_name}
                      </li>
                    );
                  }

                  // Just a regular member
                  return (
                    <li key={member.mem_id} className="member">
                      {member.mem_name}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )
      }
    </div>
  );
}

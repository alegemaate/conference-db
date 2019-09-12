import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Room from "../entities/room.js";
import AttendeeType from "../entities/attendee-type.js";

import DbClient from "../components/DbClient";
import {
  API_PATH_ATTENDEE_CREATE,
  API_PATH_ATTENDEE_TYPE,
  API_PATH_ROOM
} from "../constants/endpoints";

export default function AttendeeAddView() {
  // State
  const [attendeeTypes, setAttendeeTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [typeId, setTypeId] = useState(null);
  const [roomId, setRoomId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // Read attendee types
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_ATTENDEE_TYPE);
        setAttendeeTypes(body.map(type => new AttendeeType(type)));
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
      const { message } = await db.post(API_PATH_ATTENDEE_CREATE, {
        name,
        email,
        type_id: typeId,
        room_id: roomId
      });
      setMessage(message);
      await loadRooms();
    } catch (error) {
      setError(error.message);
    }
  }

  function updateRoomSelector(val) {
    if (val === "1") {
      loadRooms();
    } else {
      setRooms([]);
      setRoomId(null);
    }
  }

  // Get rooms
  async function loadRooms() {
    const db = new DbClient();

    try {
      const { body } = await db.post(API_PATH_ROOM);
      setRooms(Object.keys(body).map(key => new Room(body[key])));
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div id="sponsor-add">
      <h2 className="page-title">Add attendee</h2>
      <h2 className="page-title-bottom">Wicked</h2>
      <form action="#">
        <label>Name</label>
        <input
          type="text"
          placeholder="Attendee name.."
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label>Email</label>
        <input
          type="email"
          placeholder="Attendee email.."
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label>Attendee Type</label>
        <select
          type="text"
          onChange={e => {
            updateRoomSelector(e.target.value);
            setTypeId(parseInt(e.target.value, 10));
          }}
          defaultValue=""
        >
          <option value="" disabled hidden>
            {" - Select an attendee type - "}
          </option>
          {attendeeTypes.map(({ id, name, fee }) => (
            <option key={id} value={id}>
              {name} - ${fee}
            </option>
          ))}
        </select>

        {rooms && (
          <div>
            <label>Select Room</label>
            <select
              id="room"
              name="room"
              defaultValue=""
              onChange={e => setRoomId(parseInt(e.target.value, 10))}
            >
              <option value="" disabled hidden>
                {"  - Select a room - "}
              </option>
              <option value="null">No room</option>
              {// If the committee names have been received display them
              rooms.map(({ id, building, number }) => (
                <option key={id} value={id}>
                  {building} - {number}
                </option>
              ))}
            </select>
          </div>
        )}

        <input
          type="submit"
          onClick={e => handleFormSubmit(e)}
          value="Submit"
        />
        <Link to="/attendees">
          <button>Back</button>
        </Link>
      </form>
      {message && <p>{message}</p>}
      {error && <p>There was an error: {error}</p>}
    </div>
  );
}

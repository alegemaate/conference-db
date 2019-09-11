import React, { useEffect, useState } from "react";

import Room from "../entities/room.js";

import DbClient from "../DbClient";
import { API_PATH_ROOM } from "../../constants/endpoints";

export default function RoomView() {
  // State
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState("");

  // Load up rooms
  useEffect(() => {
    async function fetch() {
      const db = new DbClient();

      try {
        const { body } = await db.post(API_PATH_ROOM);
        setRooms(Object.keys(body).map(key => new Room(body[key])));
      } catch (error) {
        setError(error.message);
      }
    }
    fetch();
  }, []);

  // Select room
  function selectRoom(id) {
    return rooms.find(rm => rm.state.id == id);
  }

  // Render page
  return (
    <div className="Rooms">
      <h2 className="page-title">Room Occupants</h2>
      <h2 className="page-title-bottom">Who is staying where?</h2>
      <div>
        <form action="#">
          <label>Room</label>

          <select
            id="room"
            name="room"
            defaultValue=""
            onChange={e => setSelectedRoom(selectRoom(e.target.value))}
          >
            <option value="" disabled hidden>
              {" - Select a room - "}
            </option>
            {// If the committee names have been received display them
            rooms.map(rm => rm.renderSelect())}
          </select>
          <div>
            {error && (
              <div className="error">Sorry, an error occured. ({error})</div>
            )}
          </div>
        </form>
      </div>
      {// Have we received a list of members?
      selectedRoom && (
        <div>
          <h2>Occupants</h2>
          <div className="result">
            <ul>{selectedRoom.renderOccupants()}</ul>
          </div>
        </div>
      )}
    </div>
  );
}

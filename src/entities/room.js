// Stores rooms
export default class Room {
  // Ctor
  constructor({ building, room_id, room_number, capacity, occupants }) {
    this.building = building;
    this.id = room_id;
    this.number = room_number;
    this.capacity = capacity;
    this.occupants = occupants;
  }
}

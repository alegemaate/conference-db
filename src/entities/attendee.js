// Stores attendees
export default class Attendee {
  // Ctor
  constructor({ att_id, room_id, name, email, type_name, fee }) {
    this.id = att_id;
    this.room_id = room_id;
    this.name = name;
    this.email = email;
    this.type_name = type_name;
    this.fee = fee;
  }
}

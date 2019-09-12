// Stores attendees
export default class AttendeeType {
  constructor({ att_type_id, type_name, fee }) {
    this.id = att_type_id;
    this.name = type_name;
    this.fee = fee;
  }
}

// Stores committees
export default class Committee {
  // Ctor
  constructor({ com_name, com_id, chair_id, members }) {
    this.name = com_name;
    this.id = com_id;
    this.chair_id = chair_id;
    this.members = members;
  }
}

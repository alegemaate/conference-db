// Stores sponsors
export default class Sponsor {
  // Ctor
  constructor({
    name,
    spn_id,
    tier_id,
    emails_sent,
    emails_allowed,
    tier_name,
    fund_level
  }) {
    this.name = name;
    this.id = spn_id;
    this.tier_id = tier_id;
    this.emails_sent = emails_sent;
    this.emails_allowed = emails_allowed;
    this.tier_name = tier_name;
    this.fund_level = fund_level;
    this.jobs = [];
  }
}

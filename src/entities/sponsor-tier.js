// Stores sponsor tiers
export default class SponsorTier {
  // Ctor
  constructor({ tier_id, name, fund_level, emails_allowed }) {
    this.id = tier_id;
    this.name = name;
    this.fund_level = fund_level;
    this.emails_allowed = emails_allowed;
  }
}

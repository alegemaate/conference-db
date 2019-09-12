// Stores Jobs
export default class Job {
  // Ctor
  constructor({ job_id, spn_id, title, city, province, pay_rate }) {
    this.job_id = job_id;
    this.spn_id = spn_id;
    this.title = title;
    this.city = city;
    this.province = province;
    this.pay_rate = pay_rate;
  }
}

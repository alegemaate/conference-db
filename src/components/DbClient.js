import axios from "axios";

// Root of api
const API_ROOT = "http://localhost";

// Custom error
class DbError extends Error {}

// Db client class
export default class DbClient {
  async post(url, params) {
    try {
      const { data } = await axios({
        method: "post",
        url: `${API_ROOT}${url}`,
        headers: { "content-type": "application/json" },
        data: params,
      });
      return data;
    } catch (e) {
      throw new DbError(e);
    }
  }
}

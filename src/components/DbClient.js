import { API_ROOT } from "./api-config";
import axios from "axios";

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
        data: params
      });
      return data;
    } catch (e) {
      throw new DbError(e);
    }
  }
}

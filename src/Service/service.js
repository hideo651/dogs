import axios from "axios";

export const api = axios.create({
  baseURL: "https://dogsapi.origamid.dev/json",
  timeout: 12000,
});

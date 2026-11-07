import axios from "axios";

export const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API });

export const formatPrice = (cents) =>
  `$${(cents / 100).toFixed(2).replace(/\.00$/, ".00")}`;

import axios from "axios";
import Shoutout from "../models/Shoutout";

const baseUrl: string =
  import.meta.env.VITE_APP_BASE_URL ?? "BASE URL NOT FOUND";

// Get all shoutouts
export const getShoutouts = (name?: string): Promise<Shoutout[]> => {
  return axios
    .get(`${baseUrl}/shoutouts`, { params: { name } })
    .then((res) => res.data);
};

// Get shoutout by id
export const getShoutoutById = (id: string): Promise<Shoutout> => {
  return axios
    .get(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`)
    .then((res) => res.data);
};

// Create shoutout
export const createShoutout = (shoutout: Shoutout): Promise<Shoutout> => {
  return axios.post(`${baseUrl}/shoutouts`, shoutout).then((res) => res.data);
};

// Replace shoutout
export const replaceShoutout = (
  id: string,
  updatedShoutout: Shoutout
): Promise<Shoutout> => {
  return axios
    .put(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`, updatedShoutout)
    .then((res) => res.data);
};

// Delete All shoutouts
export const deleteShoutouts = (): Promise<void> => {
  return axios.delete(`${baseUrl}/shoutouts`).then((res) => res.data);
};

// Delete shoutout by iD
export const deleteShoutoutById = (id: string): Promise<void> => {
  return axios
    .delete(`${baseUrl}/shoutouts/${encodeURIComponent(id)}`)
    .then((res) => res.data);
};

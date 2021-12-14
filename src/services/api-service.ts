import { UpdatePayload } from "../interfaces/update-payload";
import axios from "../config/axios";

const getRequests = () => axios.get("/request").then((res) => res.data);

const updateRequest = (payload: UpdatePayload) =>
  axios.put(`/request/${payload._id}`, payload).then((res) => res.data);

const createRequest = (name: string) =>
  axios.post("/request", { name: name }).then(({ data }) => data);

export default {
  getRequests,
  updateRequest,
  createRequest,
};

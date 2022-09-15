import axios from "axios";

const getAllConsigment = () => {
  return axios.get("http://localhost:4000/api/consignment/list");
};

const getAllProducer = () => {
  return axios.get("http://localhost:4000/api/producer/list");
};

const updateConsignment = (id, data) => {
  return axios.post(`http://localhost:4000/api/consignment/update/${id}`, data);
};

const deleteConsignment = (id) => {
  return axios.delete(`http://localhost:4000/api/consignment/delete/${id}`);
};

export {
  getAllConsigment,
  getAllProducer,
  deleteConsignment,
  updateConsignment,
};

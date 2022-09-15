import axios from "axios";

const getAllConsigment = () => {
  return axios.get("http://localhost:4000/api/consignment/list");
};

const getAllProducer = () => {
  return axios.get("http://localhost:4000/api/producer/list");
};

const deleteConsignment = (_id) => {
  return axios.delete(`http://localhost:4000/api/consignment/delete/${_id}`);
};

export { getAllConsigment, getAllProducer, deleteConsignment };

import axios from "../utils/axiosCustomize";
const postCreateNewUser = (email, password, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.post("api/consignment/create", data);
};

const getAllConsigment = () => {
  return axios.get("api/consignment/list");
};

const putUpdateUser = (_id, username, role, image) => {
  // submit data
  const data = new FormData();
  data.append("id", _id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return axios.put(`api/consignment/update/${_id}`, data);
};

const deleteUser = (userId) => {
  return axios.delete("api/v1/participant", { data: { id: userId } });
};
const getUserWithPaginate = (page, limit) => {
  return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const postLogin = (email, password) => {
  return axios.post("api/v1/login", { email, password });
};

const postRegister = (email, username, password) => {
  const data = new FormData();
  data.append("email", email);
  data.append("username", username);
  data.append("password", password);

  return axios.post("api/v1/register", data);
};

export {
  postCreateNewUser,
  getAllConsigment,
  putUpdateUser,
  deleteUser,
  getUserWithPaginate,
  postLogin,
  postRegister,
};

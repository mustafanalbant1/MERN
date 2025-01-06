import api from "../utils/axios";

export const login = async (email, password) => {
  const response = await api.post("/users/login", { email, password });
  return response.data;
};

export const register = async (email, password) => {
  const response = await api.post("/users/register", { email, password });
  return response.data;
};

export const getProfile = async () => {
  const response = await api.get("/users/profile");
  return response.data;
};

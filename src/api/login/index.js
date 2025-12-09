import superagent from "superagent";
import { BASE_API } from "../../constants/index";

export const login = async (credentials) => {
  try {
    const response = await superagent
      .post(`${BASE_API}/auth/sign-in`)
      .type("form")
      .send(credentials);
    return response.body;
  } catch (error) {
    if (error.response && error.response.body) {
      throw error.response.body;
    }
    throw error;
  }
};

export const register = async (userData) => {
  try {
    const response = await superagent.post(`${BASE_API}/auth/sign-up`).send(userData);
    return response.body;
  } catch (error) {
    if (error.response && error.response.body) {
      throw error.response.body;
    }
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await superagent
      .get(`${BASE_API}/auth/profile`)
      .set("Authorization", `Bearer ${token}`);
    return response.body;
  } catch (error) {
    if (error.response && error.response.body) {
      throw error.response.body;
    }
    throw error;
  }
};

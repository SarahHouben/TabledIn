import axios from "axios";

const signup = (username, password, email) => {
  return axios
    .post("/api/v2/auth/signup", { username, password, email })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const login = (username, password) => {
  return axios
    .post("/api/v2/auth/login", { username, password })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

const logout = () => {
  return axios
    .delete("/api/v2/auth/logout")
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export { signup, login, logout };

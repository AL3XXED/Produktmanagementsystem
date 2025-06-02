import axios from "axios";

const API_URL = "https://localhost:7106/api/auth";

const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/login`, {
    username,
    password,
  });

  const token = response.data.token;
  localStorage.setItem("token", token);

  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const logout = () => {
  localStorage.removeItem("token");
  delete axios.defaults.headers.common["Authorization"];
};

const getToken = () => localStorage.getItem("token");
const isLoggedIn = () => !!getToken();

const authService = {
  login,
  logout,
  getToken,
  isLoggedIn,
};

export default authService;

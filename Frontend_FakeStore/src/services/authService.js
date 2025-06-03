import { jwtDecode }  from "jwt-decode";
import axiosInstance from "./axiosInstance";

const API_URL = "https://localhost:7106/api/auth";
const Token_Key = "token";

const login = async (username, password) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  const token = data.token;
  localStorage.setItem(Token_Key, token);

  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

const logout = () => {
  localStorage.removeItem(Token_Key);

  delete axiosInstance.defaults.headers.common["Authorization"];
};

const getToken = () => localStorage.getItem(Token_Key);

const isLoggedIn = () => !!getToken();

const getUser = () => {
  const token = getToken();
  if (!token) return null;

  const decoded = jwtDecode(token);
  return decoded?.unique_name || decoded?.name || null;
};

const isAdmin = () => {
  const user = getUser();
  return user === "admin";
};

export default {
  login,
  logout,
  getToken,
  isLoggedIn,
  getUser,
  isAdmin,
};

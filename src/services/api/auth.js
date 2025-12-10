import makeApiRequest from "./api";

const auth = {
  login: (data) => {
    makeApiRequest("post", "/login", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("type", data.type);
    return data;
  },
  register: (data) => {
    makeApiRequest("post", "/register", data);
    localStorage.setItem("token", data.token);
    localStorage.setItem("name", data.name);
    localStorage.setItem("type", data.type);
    return data;
  },
  logout: () => {
    makeApiRequest("post", "/logout");
    auth.logoutUser();
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("type");
  },
  currentUser: () => {
    return localStorage.getItem("name");
  },
  currentUserType() {
    const raw = localStorage.getItem("type");
    return raw ? JSON.parse(raw) : null;
  },
};

export default auth;

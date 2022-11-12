import axios from "axios";

function getLocalRefreshToken() {
  const token = window.localStorage.getItem("refreshToken");
  return JSON.parse(token);
}

const Http = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 300000,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return (status >= 200 && status < 300) || status === 401 || status === 403;
  },
});

const refreshToken = async () => {
  let ref = getLocalRefreshToken();
  let reftoken = {
    refreshToken: ref,
  };
  return await Http.post("http://localhost:8080/token", reftoken);
};

Http.setToken = (token) => {
  Http.defaults.headers.Authorization = token;
  window.localStorage.setItem("token", token);
};

Http.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

Http.interceptors.response.use(
  (response) => {
    const err = response.data;
    if (err.message == "Unauthorized access.") {
      refreshToken()
        .then((rs) => {
          const { token } = rs.data;
          Http.setToken(token);
          const config = response.config;
          config.headers.Authorization = token;
          config.baseURL = "http://localhost:8080/";
          return Http(config);
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    return response;
  },
  (error) => {
    if (error.response) {
      return error;
    } else {
      return Promise.reject(error);
    }
  }
);

export default Http;

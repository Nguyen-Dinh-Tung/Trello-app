import Http from "../http/http";

const token = localStorage.getItem("token");

export const getData = async () => {
  const url = "/user/test";
  return await Http.post(url, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });
};

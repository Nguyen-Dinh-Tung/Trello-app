import Http from "../http/http";

async function getImageUser(data) {
  return await Http.get("/user/image/" + data);
}

export default getImageUser;

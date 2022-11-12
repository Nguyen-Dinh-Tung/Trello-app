import Http from "../http/http";

async function getUser() {
  return await Http.get("/user/find");
}

export default getUser;

import Http from "../http/http";

async function sendEmailUser(data) {
  return await Http.post("/user/send-email", data);
}

export default sendEmailUser;

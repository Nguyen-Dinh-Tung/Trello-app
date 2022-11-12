import Http from "../http/http";

async function reSetPass(data) {
  return await Http.post("/resetPassword", data);
}

export default reSetPass;

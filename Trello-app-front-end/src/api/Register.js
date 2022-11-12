import Http from "../http/http";

async function register(data) {
  return await Http.post("/register", data);
}

export default register;

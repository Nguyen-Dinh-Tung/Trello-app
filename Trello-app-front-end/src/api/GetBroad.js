import axios from "axios";
import Http from "../http/http";

async function getBroad(idUser) {
  return await Http.get("/user/broad/" + idUser);
}

export default getBroad;

import Http from "../http/http";

async function Member(data) {
  return await Http.post("/user/data-member/" + data);
}

export default Member;

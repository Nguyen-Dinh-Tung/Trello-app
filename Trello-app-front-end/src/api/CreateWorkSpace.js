import Http from "../http/http";

async function CreateWorkSpace(data) {
  return await Http.post("/user/create-work-space", data);
}

export default CreateWorkSpace;

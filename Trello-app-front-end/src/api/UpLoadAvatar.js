import Http from "../http/http";

async function UploadAvatar(data) {
  return await Http.post("/user/upload-avatar", data);
}

export default UploadAvatar;

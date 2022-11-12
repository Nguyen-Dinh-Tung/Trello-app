import React from "react";
import axios from "axios";
async function UpdateBroad(data) {
  console.log();
  return await axios.post(
    `http://localhost:8080/user/broad-update/${data._id}`,
    data
  );
}
export default UpdateBroad;

import React from "react";
import axios from "axios";
async function SetBroad(data) {
  return await axios.post("http://localhost:8080/user/broad-data", data);
}

export default SetBroad;

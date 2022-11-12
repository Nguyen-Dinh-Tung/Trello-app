import React from "react";
import axios from "axios";

async function getDataBroad(idBroad) {
  return await axios.get(`http://localhost:8080/user/broad-data/` + idBroad);
}

export default getDataBroad;

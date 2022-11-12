import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


export default function MediaCard(props) {
  const broad = props.broad;
  console.log("🚀 ~ file: Card.jsx ~ line 12 ~ MediaCard ~ broad", broad)
  const idWS = props.idWorkSpace;
  const navigate = useNavigate();
  const handleCLick = () => {
    navigate("/broad", { state: { broad: broad, idWorkSpace: idWS } });
  };

  
  return (
    <div onClick={handleCLick}>
      <a

        className="block p-2 cursor-pointer text-left max-w-sm rounded-lg border border-gray-200 shadow-md  hover:ring-2 hover::ring-slate-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        style={{ height: 130 + "px", width: 250 + "px",background:`url(${broad.img})`}}
      >
        <span className="text-left text-xl font-bold tracking-tight text-gray-900 dark:text-black">
          {broad.title}
        </span>
      </a>
    </div>
  );
}

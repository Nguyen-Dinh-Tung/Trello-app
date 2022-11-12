import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import getBroad from "./../../api/GetBroad";
import { useState } from "react";
import { useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setDataBroad } from "../../redux/features/broad.slice";
import {
  setIdWorkSpace,
  setShowWorkSpace,
} from "../../redux/features/showModal.slice";
import { useSelector } from "react-redux";
import { Loading } from "../../components/Loading/Loading";

function Home(props) {
  const token = localStorage.getItem("token");
  const idUser = jwtDecode(token)["id"];
  const dispatch = useDispatch();
  const flag = useSelector((state) => state.isShowModal.flag);
  const [loading, setLoading] = useState(false);

  let [listIdBroad, setListIdBroad] = useState([]);
  let [columnsOrder, setColumnOrder] = useState([]);
  let [workspace, setWorkSpace] = useState([]);
  useEffect(() => {
    setLoading(true);
    getBroad(idUser)
      .then((res) => {
        setLoading(false);
        setColumnOrder(res.data.data);
        setWorkSpace(res.data.listWorkSpace);
        dispatch(setShowWorkSpace(res.data.listWorkSpace));
      })
      .catch((e) => console.log(e.message));
  }, [flag]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <header>
            <Navbar></Navbar>
          </header>
          <Sidebar columnsOrder={columnsOrder} WorkSpace={workspace} />
        </div>
      )}
    </>
  );
}
export default Home;

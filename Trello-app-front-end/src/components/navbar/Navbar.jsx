import { Outlet } from "react-router-dom";
import Modals from "../Modals/Modals";
import { useDispatch } from "react-redux";
import {
  setShowMenuDivider,
  setShowModal,
} from "../../redux/features/showModal.slice";
import IsLogin from "./IsLogin";
import Drop3 from "./Drop3";
import Drop1 from "./Drop1";
import Drop2 from "./Drop2";
import MenuDivider from "../MenuDivider/MenuDivider";
import { useSelector } from "react-redux";
import ModalSpace from "../ModalSpace/ModalSpace";
import { useState } from "react";
import jwtDecode from "jwt-decode";
export default function Navbar() {
  const dispatch = useDispatch();
  const isShowMenuDivider = useSelector(
    (state) => state.isShowModal.isShowMenudivider
  );
  const handleShowMenuDivider = () => {
    dispatch(setShowMenuDivider("block"));
  };
  return (
    <div className=" h-20vh w-full bg-sky-600 shadow">
      <Modals />
      <ModalSpace />
      <nav className="navbar flex items-center justify-between justify-center flex-wrap lg:px-2 text-white ">
        <button className="px-2">
          <i class="fa-brands fa-xl fa-trello"></i>
        </button>
        <div className="flex mr-5 justify-between lg:w-auto w-full lg:border-b-0 ml-2 text-center justify-center border-solid border-b-2 border-gray-300  lg:pb-0">
          <div className="flex items-center flex-shrink-0 text-gray-800 ">
            <a href="/">
              {" "}
              <span className="font-semibold text-xl tracking-tight ">
                Trello
              </span>
            </a>
          </div>
        </div>
        <div className="menu w-full lg:block flex-grow lg:flex lg:items-center lg:w-auto ">
          <div className=" text-md flex-row flex gap-2 lg:flex-grow ">
            {/* dropdow-1 */}
            <Drop1 />
            {/* dropdow-2 */}
            <Drop2 />
            {/* dropdow-3 */}
            <Drop3 />
            {/* create */}
            <MenuDivider />
          </div>

          {/* This is an example component */}
          <div className="relative mx-auto text-gray-600 lg:block hidden">
            <input
              className="border-2 border-gray-300 bg-white h-8 pl-2 pr-8 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-2">
              <svg
                className="text-gray-600 h-4 w-4 "
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 56.966 56.966"
                style={{ enableBackground: "new 0 0 56.966 56.966" }}
                xmlSpace="preserve"
                width="512px"
                height="512px"
              >
                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
              </svg>
            </button>
          </div>
          {/* login-logout */}
          <IsLogin />
        </div>
      </nav>
      <Outlet></Outlet>
    </div>
  );
}

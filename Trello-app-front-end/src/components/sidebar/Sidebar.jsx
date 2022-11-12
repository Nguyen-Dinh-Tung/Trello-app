import { useEffect, useState } from "react";
import MediaCard from "../Card/Card";
import { useSelector } from "react-redux";
import Project from "./Project";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import Member from "../../api/DataMember";
import jwtDecode from "jwt-decode";
import { useLocation } from "react-router-dom";
import getBroad from "../../api/GetBroad";

export default function Sidebar(props) {
  let decode = jwtDecode(localStorage.getItem("token"));
  const dataWorkSpace = props.WorkSpace;
  const columnsOrder = props.columnsOrder;
  const [member, setmember] = useState();
  
  // useEffect(() => {
  //   getBroad(decode.id)
  //     .then((res) => console.log(res))
  //     .catch((e) => console.log(e));
  // });
  function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: 30,
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  return (
    <div className="flex flex-cols gap-12 justify-center mt-8 ">
      <Project />

      {/* oulet */}

      <div className="pl-5  ">
        <div className="text-slate-400 text-xl pb-5 ">
          Các không gian làm việc của bạn
        </div>
        <div className="flex flex-col gap-5">
          {dataWorkSpace.map((item, index) => (
            <div>
              <div className="flex px-2">
                <Button>
                  <Avatar variant="rounded" {...stringAvatar(item.name)} />
                </Button>
                <span className="my-auto text-3xl font-bold">{item.name}</span>
                <div className=" ml-40  flex flex-row gap-3 mb-6">
                  <div className="flex hover:bg-slate-300 bg-slate-200 p-1 px-2 rounded cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 022 20"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mt-0.5 items-center mr-0.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
                      />
                    </svg>
                    <a>Bảng</a>
                  </div>
                  <div className="flex hover:bg-slate-300 bg-slate-200 p-1 px-2 rounded cursor-pointer">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mt-1 mr-3"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                      />
                    </svg>

                    <a>Thành viên()</a>
                  </div>
                </div>
              </div>
              <div className=" ">
                <div className="grid grid-cols-3 gap-4 ">
                  {columnsOrder ? (
                    columnsOrder.map((broad) => {
                      if (item.id_listIdBroad.includes(broad._id)) {
                        return (
                          <MediaCard broad={broad} idWorkSpace={item._id} />
                        );
                      }
                    })
                  ) : (
                    <h2>Hiện chưa có dữ liệu</h2>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <Content/> */}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import getImageUser from "../../api/GetImageUser";
import Avatar from "@mui/material/Avatar";

export default function IsLogin() {
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
      },
      children: `${name.split(" ")[0][0]}`,
    };
  }
  const [avatar, setAvatar] = useState(false);
  const [valueAvatar, setValueAvatar] = useState();

  const isLogin = localStorage.getItem("token");

  let decode;
  if (isLogin) {
    decode = jwt_decode(isLogin);
  }
  const name = decode.name.split("");
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setOpen(false);
  };
  let idUser = decode["id"];
  

  useEffect(() => {
    getImageUser(idUser)
      .then((res) => {
        if (res.data.message === "Không có ảnh!") {
          setAvatar(false);
        } else if (res.data.message === "Unauthorized access.") {
          setAvatar(false);
        } else {
          setValueAvatar(res.data.message);
          setAvatar(true);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      {isLogin ? (
        <div className="flex items-center relative">
          <div className=" items-center text ml-2  text-stone-700">
            <div
              className="avatar "
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <div className="cursor-pointer">
                {valueAvatar ? (
                  <div>
                    <Avatar src={valueAvatar} />
                  </div>
                ) : (
                  <Avatar title={decode.name} {...stringAvatar(decode.name)} />
                )}
              </div>
            </div>

            <ul
              style={{
                flex: "auto",
                width: 460 + "%",
                top: 120 + "%",
                left: -350 + "%",
              }}
              className="
              divide 
              divide-y
   dropdown-menu
   bg-white
   text-base
   shadow-lg
   hidden
 "
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <div>
                  <a className="text-sm text-center cursor-text text-black p-2 flex flex-row">
                    <span className="text-center text-stone-500 w-full">
                      Tài khoản
                    </span>
                    <button
                      className="cursor-pointer absolute top-5.4 right-0 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded "
                      aria-label="close modal"
                      role="button"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-x"
                        width={17}
                        height={17}
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <line x1={18} y1={6} x2={6} y2={18} />
                        <line x1={6} y1={6} x2={18} y2={18} />
                      </svg>
                    </button>
                  </a>
                </div>
              </li>
              <li>
                <div className="flex flex-row gap-4 p-2">
                  <div>
                    {valueAvatar ? (
                      <div>
                        <Avatar src={valueAvatar} />
                      </div>
                    ) : (
                      <div title={decode.name}>
                        <Avatar {...stringAvatar(decode.name)} />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-sm">{decode.name}</span>
                    <span className="text-xs text-gray-400">
                      {decode.email}
                    </span>
                  </div>
                </div>
              </li>
              <li className="hover:bg-stone-200">
                <a
                  className="
       dropdown-item
       text-sm
       font-normal
       block
       w-full
       whitespace-nowrap
       bg-transparent
       text-gray-700
       hover:bg-gray-100
     "
                  href="/account"
                >
                  Thông tin tài khoản
                </a>
              </li>

              <li className="hover:bg-stone-200">
                <a
                  onClick={() => handleLogout()}
                  className="
       dropdown-item
       text-sm
       font-normal
       block
       w-full
       whitespace-nowrap
       bg-transparent
       text-gray-700
       hover:bg-gray-100
     "
                  href="/"
                >
                  Đăng xuất
                </a>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="flex">
          <a
            href="/register"
            className="block text-md px-4 py-2 rounded  ml-2 font-bold hover:text-white lg:mt-0 "
          >
            Đăng ký
          </a>
          <a
            href="/login"
            className=" block text-md px-4  ml-2 py-2 rounded font-bold hover:text-white lg:mt-0"
          >
            Đăng nhập
          </a>
        </div>
      )}
    </>
  );
}

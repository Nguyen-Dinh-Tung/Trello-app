import React, { useEffect, useState } from "react";
import { Select, Option } from "@material-tailwind/react";
import createBroad from "../../api/CreateBroad.api";
import { useSelector } from "react-redux";
import { setFlag, setShowModal } from "../../redux/features/showModal.slice";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import getBroad from "../../api/GetBroad";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { Button, RadioGroup } from "@mui/material";

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Burger",
  },
  {
    img: "https://images.unsplash.com/photo-1522770179533-24471fcdba45",
    title: "Camera",
  },
  {
    img: "https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c",
    title: "Coffee",
  },
  {
    img: "https://images.unsplash.com/photo-1533827432537-70133748f5c8",
    title: "Hats",
  },
  {
    img: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62",
    title: "Honey",
  },
  {
    img: "https://images.unsplash.com/photo-1516802273409-68526ee1bdd6",
    title: "Basketball",
  },
  {
    img: "https://images.unsplash.com/photo-1518756131217-31eb79b20e8f",
    title: "Fern",
  },
  {
    img: "https://images.unsplash.com/photo-1597645587822-e99fa5d45d25",
    title: "Mushrooms",
  },
  {
    img: "https://images.unsplash.com/photo-1567306301408-9b74779a11af",
    title: "Tomato basil",
  },
  {
    img: "https://images.unsplash.com/photo-1471357674240-e1a485acb3e1",
    title: "Sea star",
  },
  {
    img: "https://images.unsplash.com/photo-1589118949245-7d38baf380d6",
    title: "Bike",
  },
];

function Modals(props) {
  const [img, setImg] = useState("");

  const handleChangeImg = (e) => {
    setImg(e)
    setNewBroad({...newBroad, img: e})
  };

  const isShowModal = useSelector((state) => state.isShowModal.isShowModal);

  let [workspace, setWorkSpace] = useState([]);

  const dispatch = useDispatch();
  let token = localStorage.getItem("token");
  let idUser = jwtDecode(token).id;
  const [newBroad, setNewBroad] = useState({
    title: "",
    mode: "",
    idUser: idUser,
    workSpace: "",
  });

  const [isCreateBroad, setCreateBroad] = useState(true);

  const handleHiddenModals = () => {
    dispatch(setShowModal("none"));
  };
  useEffect(() => {
    getBroad(idUser)
      .then((res) => {
        setWorkSpace(res.data.listWorkSpace);
      })
      .catch((e) => console.log(e.message));
  }, []);

  useEffect(() => {
    if (newBroad.title && newBroad.mode && newBroad.workSpace && newBroad.img) {
      setCreateBroad(false);
    } else {
      setCreateBroad(true);
    }
  }, [newBroad]);

  const handleClick = () => {
    if (isCreateBroad === false) {
        createBroad(newBroad)
          .then((res) => {
            dispatch(setShowModal("none"));
            dispatch(setFlag(res));
          })
          .catch((e) => console.log(e.message));
    }
  };
  return (
    <>
      <div className="modals" style={{ display: isShowModal }}>
        <div
          className="py-12 backdrop-blur-sm  transition duration-150 ease-in-out z-10 absolute top-0 right-0 bottom-0 left-0"
          id="modal"
        >
          <div
            role="alert"
            className="container mx-auto w-11/12 max-w-fit flex"
          >
            <div
              style={{ background: `url(${img})` }}
              className="relative flex flex-row gap-5 bg-white py-8 w-full px-5 md:px-10 dark:bg-gray-800 dark:border-gray-700 shadow-md rounded border border-gray-400"
            >
              <div className="w-3/5">
                <h1 className="text-gray-800 dark:text-black text-3xl ml-1 font-lg font-bold tracking-normal leading-tight mb-4">
                  Thêm bảng mới
                </h1>
                <label
                  htmlFor="name"
                  className="text-gray-800 dark:text-black text-xl ml-1 font-bold leading-tight tracking-normal"
                >
                  Tiêu đề
                </label>

                <input
                  id="name"
                  className="mb-5 mt-2 text-gray-600 text-xl dark:text-black dark:placeholder-gray-400 dark:border-gray-700 focus:outline-none focus:border focus:border-indigo-700 font-normal w-full h-10 flex items-center pl-3 border-gray-300 rounded border"
                  name="title"
                  onChange={(e) => {
                    setNewBroad({
                      ...newBroad,
                      [e.target.name]: e.target.value,
                    });
                  }}
                  placeholder="Tiêu đề của bạn"
                  required
                />
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-xl dark:text-black font-bold leading-tight tracking-normal"
                >
                  Không gian làm việc
                </label>

                <div className="relative mb-5 mt-2 text-lg ">
                  <select
                    className="text-gray-600 w-48"
                    onChange={(e) => {
                      setNewBroad({ ...newBroad, workSpace: e.target.value });
                    }}
                  >
                    {workspace.map((item) => (
                      <option value={item._id}>{item.name}</option>
                    ))}
                  </select>
                </div>
                <label
                  htmlFor="cvc"
                  className="text-gray-800 text-xl dark:text-black font-bold leading-tight tracking-normal"
                >
                  Trạng thái
                </label>

                <div className="relative mb-5 mt-2">
                  <select
                    className="text-gray-600 text-lg w-32"
                    onChange={(e) => {
                      setNewBroad({ ...newBroad, mode: e.target.value });
                    }}
                  >
                    <option value="">Trạng thái</option>
                    <option value="private">Chỉ mình tôi</option>
                    <option value="group">Nhóm</option>
                    <option value="public">Công khai</option>
                  </select>
                </div>
                <div className="flex items-center justify-start w-full ">
                  <button
                    className=" cursor:pointer focus:ring-2 bg-gradient-to-r text-xl from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-offset-2 focus:ring-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 bg-indigo-700 rounded text-white px-8 py-2 "
                    disabled={isCreateBroad}
                    onClick={handleClick}
                  >
                    Tạo
                  </button>
                  <button
                    className="focus:outline-none bg-gradient-to-br cursor:pointer text-xl from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-2 focus:ring-offset-2  focus:ring-gray-400 ml-3 bg-gray-100 transition duration-150  ease-in-out hover:border-gray-400 hover:bg-gray-300 border rounded px-8 py-2 text-white"
                    onClick={handleHiddenModals}
                  >
                    Hủy
                  </button>
                </div>
                <button
                  className="cursor-pointer absolute top-0 right-0 mt-4 mr-5 text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out rounded "
                  onclick="modalHandler()"
                  aria-label="close modal"
                  role="button"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-x"
                    onClick={handleHiddenModals}
                    width={20}
                    height={20}
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
              </div>
              <div className="my-auto">
                <ImageList
                  sx={{ width: "auto", height: "auto" }}
                  cols={3}
                  rowHeight={50}
                >
                  {itemData.map((item) => (
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <Button
                      onClick={()=>handleChangeImg(item.img)}

                      >
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=60&h=60&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=60&h=60&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                        </ImageListItem>
                      </Button>
                    </RadioGroup>
                  ))}
                </ImageList>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Modals;

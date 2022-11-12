import React from "react";
import Card from "../../components/Column/Column";
import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "../../components/Column/Column";
import { reorderList } from "../../reorderList/reorderList";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import UpdateBroad from "../../api/UpdateBroad";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setDataBroad } from "../../redux/features/broad.slice";
import { Button } from "@mui/material";
import Navbar from "../../components/navbar/Navbar";
import { useLocation } from "react-router";
import getDataBroad from "./../../api/getDataBroad";
import getUser from "../../api/GetUser";
import sendEmailUser from "../../api/SendEmailUser";
import Member from "../../api/DataMember";
import jwtDecode from "jwt-decode";
function Broad(props) {
  const token = localStorage.getItem("token");
  const decode = jwtDecode(token);
  const initial = useSelector((state) => state.broad.data);
  const location = useLocation();
  const idBroad = location.state.broad._id;
  const bgImg = location.state.broad.img;
  const dataByStore = useSelector((state) => state.broad.data);
  const idWorkSpace = location.state.idWorkSpace;
  const emailIdUser = jwtDecode(token)["email"];

  const dispatch = useDispatch();
  const [isTitleColumn, setIseTitleColumn] = useState(true);
  const [titleColumn, setTitleColumn] = useState();
  const [data, setData] = useState(initial);
  const [showModal, setShowModal] = useState(false);
  const [ValueShare, setValueShare] = useState();
  const [valuesUserEmail, setValueUserEmail] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [a, setA] = useState([]);
  const [flagImg, setFlagImg] = useState([]);
  const name = decode.name.split("");
  useEffect(() => {
    Member(idBroad)
      .then((res) => {
        setA(res.data.user);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [flagImg]);
  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }
    if (result.type === "column") {
      const columnOrder = reorderList(
        dataByStore.columnOrder,
        result.source.index,
        result.destination.index
      );
      dispatch(
        setDataBroad({
          ...dataByStore,
          columnOrder,
        })
      );
      return;
    }

    // reordering in same list
    if (result.source.droppableId === result.destination.droppableId) {
      const column = dataByStore.columns[result.source.droppableId];
      const items = reorderList(
        column.items,
        result.source.index,
        result.destination.index
      );
      // updating column entry
      const newState = {
        ...dataByStore,
        columns: {
          ...dataByStore.columns,
          [column.id]: {
            ...column,
            items,
          },
        },
      };
      dispatch(setDataBroad(newState));
      return;
    }

    // moving between lists
    const sourceColumn = dataByStore.columns[result.source.droppableId];
    const destinationColumn =
      dataByStore.columns[result.destination.droppableId];
    const item = sourceColumn.items[result.source.index];

    // 1. remove item from source column
    const newSourceColumn = {
      ...sourceColumn,
      items: [...sourceColumn.items],
    };
    newSourceColumn.items.splice(result.source.index, 1);

    // 2. insert into destination column
    const newDestinationColumn = {
      ...destinationColumn,
      items: [...destinationColumn.items],
    };
    // in line modification of items
    newDestinationColumn.items.splice(result.destination.index, 0, item);
    const newState = {
      ...dataByStore,
      columns: {
        ...dataByStore.columns,
        [newSourceColumn.id]: newSourceColumn,
        [newDestinationColumn.id]: newDestinationColumn,
      },
    };
    dispatch(setDataBroad(newState));
  }
  const handleShowCreateColumn = () => {
    setIseTitleColumn(false);
  };

  const handleGetTitleColunn = (e) => {
    setTitleColumn(e.target.value);
  };
  const handleCreateColumn = () => {
    setIseTitleColumn(true);
    if (titleColumn) {
      const idColum = uuidv4();
      let newData = {
        ...dataByStore,
        columns: {
          ...dataByStore.columns,
          [`${idColum}`]: {
            id: idColum,
            title: titleColumn,
            items: [],
          },
        },
        columnOrder: [...dataByStore.columnOrder, `${idColum}`],
      };
      dispatch(setDataBroad(newData));
      setTitleColumn("");
    }
  };

  const handlShowModalShare = () => {
    setShowModal(true);
  };
  // useEffect(() =>{
  //   UpdateBroad(data)
  //   .then(res => console.log(res))
  //   .catch(e => console.log(e.message))
  // },[data.columnOrder])
  useEffect(() => {
    getDataBroad(idBroad)
      .then((res) => {
        dispatch(setDataBroad(res.data.broad));
      })
      .catch((e) => console.log(e.message));
  }, []);
  useEffect(() => {
    if (dataByStore && dataByStore.columnOrder.length > 0) {
      UpdateBroad(dataByStore)
        .then((res) => console.log(res))
        .catch((e) => console.log(e.message));
    }
  }, [dataByStore]);
  const handleShare = (e) => {
    let email = [];
    setValueShare(e.target.value);
    valuesUserEmail.forEach((element) => {
      let Share = e.target.value.toLowerCase();
      let data = element.toLowerCase();
      if (data.includes(Share)) {
        email.push(element);
      }
    });
    setDataSearch(email);
  };

  useEffect(() => {
    getUser()
      .then((res) => {
        setValueUserEmail(res.data.email);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [ValueShare]);

  let member = {
    email: ValueShare,
    idbroad: idBroad,
    idWorkSpace: idWorkSpace,
    emailIdUser: emailIdUser,
  };

  const handleSendEmail = () => {
    sendEmailUser(member)
      .then((res) => {
        setValueShare("");
        setShowModal(false);
        setFlagImg(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Navbar></Navbar>
      <div
      style={{backgroundImage: `url(${bgImg})`}}
        className="Broad ">
        <div className="flex w-full ">
          <div
            className="add-column w-9/12"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "8px",
            }}
          >
            {isTitleColumn ? (
              <button
                className="asslsss"
                style={{
                  margin: "4px 10px",
                  padding: "6px",
                  width: "300px",
                  backgroundColor: "#b2b2b2",
                  color: "black",
                  borderRadius: "6px",
                }}
                onClick={handleShowCreateColumn}
              >
                Thêm cột
              </button>
            ) : (
              <>
                <input
                  type="text"
                  name="title"
                  onChange={handleGetTitleColunn}
                  style={{
                    border: "1px solid #ccc",
                    height: "40px",
                    paddingLeft: "4px",
                    borderRadius: "4px",
                    marginLeft: "14px",
                  }}
                  placeholder={"Tiêu đề cột"}
                />
                <button
                  className="asslsss"
                  style={{
                    margin: "20px 0",
                    padding: "8px",
                    width: "104px",
                    backgroundColor: "white",
                    color: "black",
                    borderRadius: "6px",
                    marginLeft: "8px",
                  }}
                  onClick={handleCreateColumn}
                  disabled={titleColumn ? false : true}
                >
                  Tạo
                </button>
              </>
            )}
          </div>
          <div className=" w-2/12 flex my-auto">
            {a.length > 0 &&
              a.map((user) => (
                <div>
                  {user.image ? (
                    <div title={user.name}>
                      <img
                        className="h-8 w-8  rounded-full "
                        src={user.image}
                      />
                    </div>
                  ) : (
                    <div title={user.name}>
                      <span
                        className={`px-2 py-0.5 rounded-full text-sm bg-gray-500 hover:bg-gray-400 font-bold text-white`}
                      >
                        {name[0]}
                      </span>
                    </div>
                  )}
                </div>
              ))}
          </div>
          <div className="text-center my-auto  w-1/12">
            <div>
              {" "}
              <a
                className="bg-sky-500 py-1 px-1  rounded cursor-pointer text-white hover:bg-sky-400"
                onClick={handlShowModalShare}
              >
                <i class="fa-solid fa-user-plus "></i> Chia sẻ
              </a>
            </div>
          </div>
          {showModal ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}
                    <div className="flex items-start justify-between p-3 border-b border-solid border-slate-200 rounded-t">
                      <h5 className="text-3xl font-semibold ">Chia sẻ bảng</h5>
                      <a
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        <i class="fa-solid fa-x"></i>
                      </a>
                    </div>
                    <div
                      className="relative p-6 flex-auto"
                      style={{ width: "600px" }}
                    >
                      <form
                        novalidate=""
                        action=""
                        className="space-y-12 ng-untouched ng-pristine ng-valid"
                      >
                        <div className="space-y-4  ">
                          <div className="m-2">
                            <div className="w-full gap-2 flex">
                              <div className="w-3/4 dark:placeholder-gray-700 cursor:text my-auto">
                                <input
                                  type="text"
                                  name="email"
                                  onChange={handleShare}
                                  id="first name"
                                  className="w-full px-3 py-2 border rounded-md dark:border-gray-700   dark:text-gray-900 "
                                  role="button"
                                  data-bs-toggle="dropdown"
                                  data-dropdown-toggle="dropdownSearch"
                                  value={ValueShare}
                                />
                                <div
                                  id="dropdownSearch"
                                  className=" dropdown-menu
            min-w-max
            absolute
            hidden
            bg-white
            py-2
            shadow
            list-none
            text-left
            rounded-lg
            mt-1
            hidden
            m-0
            border-none
             bg-white z-10 list-none divide-y-2 divide-gray-100 rounded py-2 my-1 w-44 w-64 "
                                  aria-labelledby="dropdownMenuButton2"
                                >
                                  <div className="flex flew-col gap-3">
                                    <ul
                                      className="py-1 rounded-sm text-black "
                                      aria-labelledby="dropdownLargeButton"
                                    >
                                      {dataSearch.map((item) => (
                                        <li
                                          onClick={() => {
                                            setValueShare(item);
                                          }}
                                        >
                                          <a className="text-sm block px-4 py-2">
                                            {item}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                              <div className="w-1/8 items-center justify-center p-2 my-auto border border-gray-400">
                                <select>
                                  <option value="1">Thành viên</option>
                                </select>
                              </div>
                              <a
                                onClick={handleSendEmail}
                                className="w-1/8 bg-sky-500 text-center text-white"
                              >
                                Chia sẻ
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2 ml-2"></div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          ) : null}
        </div>

        <Droppable droppableId="broad" direction="horizontal" type="column">
          {(provided) => (
            <div
              className="columns"
              style={{ display: "flex" }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {dataByStore &&
                dataByStore.columns &&
                dataByStore.columnOrder.length > 0 &&
                dataByStore.columnOrder.map((column, index) => (
                  <Column
                    className="column"
                    key={column}
                    column={dataByStore.columns[column]}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}

export default Broad;

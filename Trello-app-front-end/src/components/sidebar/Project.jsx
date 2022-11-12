import React, { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import getBroad from "../../api/GetBroad";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
export default function Project() {
  const decode = jwtDecode(localStorage.getItem("token"));
  useEffect(() => {
    getBroad(idUser)
      .then((res) => {
        setWorkSpace(res.data.listWorkSpace);
      })
      .catch((e) => console.log(e.message));
  }, []);
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

  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };
  const [workspace, setWorkSpace] = useState([]);

  const token = localStorage.getItem("token");
  const idUser = jwtDecode(token).id;

  return (
    <>
      <div
        id="Main"
        class="xl:rounded-r transform  xl:translate-x-0  ease-in-out transition duration-500 flex justify-start items-start h-full  w-full sm:w-64 bg-white-900 flex-col"
      >
        <div class="mt-6 flex flex-col justify-start items-center  pl-4 w-full border-gray-600 border-b space-y-3 pb-5 ">
          {/* Bảng */}
          <button class="flex jusitfy-start items-center space-x-6 w-full  focus:outline-none  focus:text-indigo-400  text-black rounded ">
            <span>
              {" "}
              <i class="fa-brands fa-trello"></i>{" "}
            </span>
            <span> Bảng </span>
          </button>
          {/* Mẫu */}
          <button class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-black focus:text-indigo-400   rounded ">
            <span>
              {" "}
              <i class="fa-brands fa-trello"></i>{" "}
            </span>
            <span> Bảng Mẫu </span>
          </button>
          {/* Trang chủ */}
          <button class="flex jusitfy-start items-center w-full  space-x-6 focus:outline-none text-black focus:text-indigo-400   rounded ">
            <span>
              {" "}
              <i class="fa-solid fa-house"></i>{" "}
            </span>
            <span> Trang chủ </span>
          </button>
          {/* Project */}
        </div>

        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Các không gian làm việc
            </ListSubheader>
          }
        >
          {workspace.map((item, index) => (
            < >
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <Button>
                    <Avatar
                      sx={{ fontSize: 50, fontWeight: "800px" }}
                      sizes="50px"
                      variant="rounded"
                      {...stringAvatar(item.name)}
                    />
                  </Button>
                </ListItemIcon>
                <ListItemText primary={item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Bảng" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton href={`/member/${decode.id}`} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <GroupIcon />
                    </ListItemIcon>
                    <ListItemText primary="Thành viên" />
                  </ListItemButton>
                </List>
                <List component="div" disablePadding>
                  <ListItemButton sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Cài đặt" />
                  </ListItemButton>
                </List>
              </Collapse>
            </>
          ))}
        </List>
      </div>
    </>
  );
}

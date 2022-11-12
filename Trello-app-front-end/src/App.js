import Navbar from "./components/navbar/Navbar";

import {Route, Routes} from "react-router-dom";

import Register from "./page/Register/Register";
import Sidebar from "./components/sidebar/Sidebar";
import { Login } from "./page/login/Login";
import axios from "axios";
import { GoogleOAuthProvider } from "@react-oauth/google";
import UserInfo from "./components/UserInfo/UserInfo";
import ChangePassword from "./components/ChangePassword/ChangePassword";
import Broad from "./page/broad/Broad";
import Home from "./page/home/Home";
import PrivateRoutes from "./hooks/PrivateRoutes";
import Account from "./components/Account/Account";
import MemberList from "./components/MemberList/MemberList";
function App() {
  return (
    <div>
      <GoogleOAuthProvider clientId="911041045826-05asjep9lakm58r23ckriuusu8mv38mp.apps.googleusercontent.com">
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/profile" element={<UserInfo />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/user" element={<Home />} />
            <Route path="/" element={<Home />}></Route>
            <Route path="/broad" element={<Broad />} />
            <Route element={<Navbar />}>
              <Route path="/account" element={<Account />} />
              <Route path="/member/:id" element={<MemberList />} />
            </Route>
          </Route>
        </Routes>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
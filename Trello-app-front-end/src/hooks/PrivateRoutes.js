import {Navigate, Outlet} from "react-router-dom";

let check;

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");
  if (token === null) {
    check = false;  
  } else {
    check = true;
  }
  return check ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;

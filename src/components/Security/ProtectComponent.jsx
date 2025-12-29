import { Navigate } from "react-router-dom";
import { auth } from "../../services/api";
import Forbidden403 from "./Forbidden403";

export default function ProtectComponent({ children, userType }) {
  const user = auth.currentUser();
  if (user) {
    // console.log("auth.currentUserType" , auth.currentUserType);
    // console.log("userType" , userType);
    if (auth.currentUserType() === userType) return children;
    else return <Forbidden403 />;
  } else {
    return <Navigate to="/login" />;
  }
}

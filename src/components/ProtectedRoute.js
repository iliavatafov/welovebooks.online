import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user.email) {
    return children;
  } else {
    window.location.href = "/";
  }
}

export default ProtectedRoute;

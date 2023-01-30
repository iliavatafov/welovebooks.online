import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function AdminProtectedRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user.isAdmin) {
    return children;
  } else {
    window.location.href = "/";
  }
}

export default AdminProtectedRoute;

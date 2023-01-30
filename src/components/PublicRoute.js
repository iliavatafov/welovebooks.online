import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

function PublicRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (user.email) {
    window.location.href = "/";
  } else {
    return children;
  }
}

export default PublicRoute;

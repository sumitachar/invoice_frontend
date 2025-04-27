// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ auth, children }) {
  if (!auth) {
    return <Navigate to="/authentication/sign-in/basic" replace />;
  }
  return children;
}

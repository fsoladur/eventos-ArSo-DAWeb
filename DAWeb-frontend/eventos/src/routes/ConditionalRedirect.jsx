import React from "react";

import {useAuth} from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ConditionalRedirect = () => {
    const { user } = useAuth();
    return user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />;
  };

export default ConditionalRedirect;
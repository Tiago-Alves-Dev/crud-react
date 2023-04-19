import React from "react";
import { isAuthenticated } from "../utils/auth";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }:any) => {

	if (!isAuthenticated()) {
		return <Navigate to="/" replace />;
	}
	return children;
};

export default PrivateRoute;

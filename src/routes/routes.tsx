import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Dashboard from "../pages/Home";
import Signin from "../pages/Signin";
import SigninUp from "../pages/SigninUp";

const RoutesApp = () => (
  <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/signinup"
          element={
            <PrivateRoute>
              <SigninUp />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  </BrowserRouter>
);

export default RoutesApp;

import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import Signin from "../pages/Signin";
import SigninUp from "../pages/SigninUp";
import Client from "../pages/Client";
import Sales from "../pages/Sales";
import ReportSales from "../pages/report/report-sales";
import ReportSalesByClient from "../pages/report/report-sales-by-client";

const RoutesApp = () => (
  <BrowserRouter>
    <Fragment>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signinup" element={<SigninUp />} />

        <Route
          path="/client"
          element={
            <PrivateRoute>
              <Client />
            </PrivateRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <PrivateRoute>
              <Sales />
            </PrivateRoute>
          }
        />
        <Route
          path="/rel-sales"
          element={
            <PrivateRoute>
              <ReportSales />
            </PrivateRoute>
          }
        />
        <Route
          path="/rel-sales-by-client"
          element={
            <PrivateRoute>
              <ReportSalesByClient />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  </BrowserRouter>
);

export default RoutesApp;

import React from "react";
import api from "./api";
import { toast } from "react-toastify";
import { Constants } from "../config/constants";
import { AuthUserI } from "../models/authUser";

export const AuthSignin = (
  des_email: string,
  des_senha: string
): Promise<AuthUserI | any> => {
  return api
    .post("/auth/login", {
      des_email,
      des_senha,
    })
    .then((res) => {
      let currentUser = res.data as AuthUserI;
      if (currentUser.access_token) {
        localStorage.setItem(Constants.currentUser, JSON.stringify(res.data));
      }

      toast.success("Sucesso! Login efetuado com sucesso");

      return currentUser;
    })
    .catch((err) => {
      toast.warn(
        err.response?.data.message ? err.response.data.message : err.message
      );
    });
};

export const Logout = (): Boolean => {
  if (localStorage.getItem(Constants.currentUser)) {
    localStorage.removeItem(Constants.currentUser);
    return true;
  }
  return false;
};

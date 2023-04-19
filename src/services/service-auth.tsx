import React from "react";
import api from "./api";
import { toast } from "react-toastify";
import { Constants } from "../config/constants";
import { AuthUser } from "../models/authUser";

export const AuthSignin = (
  des_email: string,
  des_senha: string
): Promise<AuthUser | any> => {
  return api
    .post("/auth/login", {
      des_email,
      des_senha,
    })
    .then((res) => {
      let currentUser = res.data as AuthUser;
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

import React from "react";
import api from "./api";
import { UserI } from "../models/user";

export const CreateUser = ({
  des_email,
  des_nome,
  des_senha,
}: UserI): Promise<UserI> => {
  return api
    .post("/users", {
      des_nome,
      des_email,
      des_senha,
    })
    .then((res) => res.data);
};

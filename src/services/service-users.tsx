import React from "react";
import api from "./api";
import { User } from "../models/user";

export const CreateUser = ({
  des_email,
  des_nome,
  des_senha,
}: User): Promise<User> => {
  return api.post("/users", {
    des_nome,
    des_email,
    des_senha,
  });
};

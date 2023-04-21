import React from "react";
import api from "./api";
import { UserI } from "../models/user";

export const CreateUser = (data: UserI): Promise<UserI> => {
  return api.post("/users", data).then((res) => res.data);
};

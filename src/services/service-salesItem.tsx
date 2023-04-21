import React from "react";
import api from "./api";
import { ItemI } from "../models/item";

export const CreateItem = (data: ItemI): Promise<ItemI> => {
  return api.post("/item", data).then((res) => res.data);
};

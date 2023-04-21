import React from "react";
import api from "./api";
import { SalesI } from "../models/sales";

export interface QueryI {
  startDate: string;
  endDate: string;
}

export const GetAllSales = (query?: QueryI): Promise<[SalesI]> => {
  let url = "/sales";
  if (query) {
    url = `/sales?startDate=${query["startDate"]}&endDate=${query["endDate"]}`;
  }
  return api.get(url).then((res) => res.data);
};

export const CreateSales = (data: SalesI): Promise<SalesI> => {
  return api.post("/sales", data).then((res) => res.data);
};

export const UpdateClient = (
  cod_cliente: string,
  data: SalesI
): Promise<SalesI> => {
  return api.patch("/sales/" + cod_cliente, data).then((res) => res.data);
};

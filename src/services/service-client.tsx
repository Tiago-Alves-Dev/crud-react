import React from "react";
import api from "./api";
import { ClientI } from "../models/client";

export const GetAllClient = (): Promise<[ClientI]> => {
  return api.get("/clients").then((res) => res.data);
};

export const GetAllClientActives = (): Promise<[ClientI]> => {
  return api.get("/clients/active").then((res) => res.data);
};

export const DeleteClient = (cod_cliente: string | any): Promise<void> => {
  return api.delete("/clients/" + cod_cliente).then((res) => res.data);
};

export const CreateClient = (data: ClientI): Promise<ClientI> => {
  return api.post("/clients", data).then((res) => res.data);
};

export const UpdateClient = (data: ClientI): Promise<ClientI> => {
  return api
    .patch("/clients/" + data.cod_cliente, data)
    .then((res) => res.data);
};

import React from "react";
import api from "./api";
import { ClientI } from "../models/client";

export const GetAllClient = (): Promise<[ClientI]> => {
  return api.get("/clients").then((res) => res.data);
};

export const DeleteClient = (cod_cliente: string | any): Promise<void> => {
  return api.delete("/clients/" + cod_cliente).then((res) => res.data);
};

export const CreateClient = ({
  des_nome,
  des_endereco,
  num_endereco,
  des_cidade,
  des_uf,
  des_telefone,
  des_contato,
}: ClientI | any): Promise<ClientI> => {
  console.log(des_nome);
  return api
    .post("/clients", {
      des_nome,
      des_endereco,
      num_endereco,
      des_cidade,
      des_uf,
      des_telefone,
      des_contato,
    })
    .then((res) => res.data);
};

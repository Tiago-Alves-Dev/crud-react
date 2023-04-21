import { ClientI } from "./client";
import { ItemI } from "./item";

export interface SalesI {
  cod_venda?: string;
  cod_cliente: string;
  dta_venda: string;
  val_total_venda: number;

  client?: ClientI;
  itens?: ItemI[];

  // default
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

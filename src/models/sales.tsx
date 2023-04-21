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
  deletedAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

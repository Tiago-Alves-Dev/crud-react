import { SalesI } from "./sales";

export interface ItemI {
  cod_item?: string;
  cod_venda: string;
  des_produto: string;
  val_unitario: number | any;
  qtd_itens: number;
  val_total: number | any;

  sale?: SalesI;

  // default
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

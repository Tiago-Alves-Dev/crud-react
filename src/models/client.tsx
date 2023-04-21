export interface ClientI {
  cod_cliente?: string;
  des_nome: string;
  des_endereco: string;
  num_endereco: number;
  des_cidade: string;
  des_uf: string;
  des_telefone: string;
  des_contato: string;
  val_venda_acumulado?: number | any;
  qtd_venda_pedidos?: number | any;
  dta_ult_pedido?: Date | any;
  flg_inativo?: boolean;

  // default
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  updatedBy?: string;
  deletedBy?: string;
}

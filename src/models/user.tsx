export interface UserI {
  cod_usuario?: string;
  des_nome: string;
  des_email: string;
  des_senha: string;
  flg_inativo?: boolean;

  // default
  createdBy?: string;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  updatedBy?: string;
  deletedBy?: string;
}

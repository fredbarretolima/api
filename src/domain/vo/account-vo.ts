export enum OPERACOES {
  CREDITO=1,
  DEBITO=2
}

export enum Categories {
  ATIVOS = 1,
  PASSIVOS = 2,
  PATRIMONIO = 3,
  RECEITAS = 4,
  DESPESAS = 5,
}

export interface AccountVo {
  id?: number; // id is set after account is persisted
  category: Categories;
  name: string;
  balance: number; // current balance of this account
  limit: number; // how negative this account balance can be
}

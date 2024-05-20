import { AccountVo, Categories } from "../vo/account-vo";

export interface AccountDto extends AccountVo {}

export interface AccountCreateDto {
  category: Categories;
  name: string;
  limit?: number;
}

export interface AccountLimitDto {
  limit: number;
}

export interface AccountTransferDto {
  ammount: number;
}

export interface AccountUpdateDto extends Partial<AccountCreateDto> {}

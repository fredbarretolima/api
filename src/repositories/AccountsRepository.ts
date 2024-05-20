import { AccountVo, Categories } from "../domain/vo/account-vo";

export interface AccountsRepository {
  create(values: AccountVo): Promise<AccountVo>;

  find(id: number): Promise<AccountVo>;

  findByCategory(category: Categories): Promise<AccountVo[]>;

  update(values: AccountVo): Promise<AccountVo>;

  delete(values: AccountVo): Promise<void>;

  list(): Promise<AccountVo[]>;
}

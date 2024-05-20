import { AccountCreateDto, AccountUpdateDto } from "../domain/dto/account-dtos";
import { Account } from "../domain/model/account";
import { AccountsRepository } from "../repositories/AccountsRepository";

export class AccountsService {
  public constructor(readonly repository: AccountsRepository) {}

  public async create(values: AccountCreateDto): Promise<Account> {
    let account = Account.create(values.category, values.name, values.limit);
    await this.repository.create(account.getValues());

    return account;
  }

  public async find(id: number): Promise<Account> {
    const values = await this.repository.find(id);
    return Account.fromVo(values);
  }

  public async list(): Promise<Account[]> {
    const result = await this.repository.list();
    return result.map((values) => Account.fromVo(values));
  }

  public async delete(id: number): Promise<void> {
    const account = await this.find(id);
    await this.repository.delete(account.getValues());
  }

  public async setAccountLimit(id: number, limit: number): Promise<Account> {
    const values = await this.repository.find(id);
    const account = Account.fromVo(values);
    account.setLimit(limit);
    await this.repository.update(account.getValues());
    return account;
  }

  public async transfer(fromId: number, toId: number, value: number) {
    const from = await this.repository.find(fromId);
    const to = await this.repository.find(toId);
    const fromAccount = Account.fromVo(from);
    const toAccount = Account.fromVo(to);
    fromAccount.transfer(toAccount, value);
  }

}

import { AccountVo, Categories } from "../../domain/vo/account-vo";
import { AccountsRepository } from "../AccountsRepository";

export class MemoryAccountsRepository implements AccountsRepository {
  private db: AccountVo[] = [];

  private nextId = 1;

  public async create(values: AccountVo): Promise<AccountVo> {
    const inx = this.db.push({ id: this.nextId++, ...values });
    return new Promise<AccountVo>((resolve) => resolve(this.db[inx]));
  }

  public find(id: number): Promise<AccountVo> {
    return new Promise<AccountVo>((resolve, reject) => {
      const result = this.db.filter((value) => value.id === id);
      if (result.length > 0) resolve(result[0]);
      else reject(new Error("Not found"));
    });
  }

  public findByCategory(category: Categories): Promise<AccountVo[]> {
    return new Promise<AccountVo[]>((resolve) => {
      const result = this.db.filter((value) => value.category === category);
      resolve(result);
    });
  }

  public update(values: AccountVo): Promise<AccountVo> {
    return new Promise<AccountVo>((resolve, reject) => {
      if (values.id) {
        this.find(values.id);
        let db = this.db.map((vo) =>
          vo.id === values.id ? { ...values } : vo
        );
        this.db = db;

        resolve(values);
      } else {
        reject(new Error("Invalid argument"));
      }
    });
  }

  public delete(values: AccountVo): Promise<void> {
    return new Promise<void>((resolve, _) => {
      const db = this.db.filter((value) => value.id !== values.id);
      this.db = db;
      resolve();
    });
  }

  public list(): Promise<AccountVo[]> {
    return new Promise<AccountVo[]>((resolve) => {
      resolve([...this.db]);
    });
  }
}

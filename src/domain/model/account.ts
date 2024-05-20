import { AccountVo, Categories } from "../vo/account-vo";

export class Account {
  private constructor(private readonly values: AccountVo) {}

  public getValues(): AccountVo {
    return { ...this.values };
  }

  public getId(): number | undefined {
    return this.values.id;
  }

  public getCategory(): Categories {
    return this.values.category;
  }

  public getName(): string {
    return this.values.name;
  }

  public getBalance(): number {
    return this.values.balance;
  }

  public getLimit(): number {
    return this.values.limit;
  }

  public static create(category: Categories, name: string, limit: number = 0) {
    Account.validateCategory(category);
    Account.validateName(name);
    Account.validateLimit(limit);

    const vo: AccountVo = { name, category, balance: 0, limit };

    return new Account(vo);
  }

  public setLimit(newLimit: number) {
    if (undefined === newLimit) {
      throw new Error("To change the limit the new limit must be informed");
    }

    Account.validateLimit(newLimit);

    this.values.limit = newLimit;
  }

  public static fromVo(values: AccountVo): Account {
    Account.validateCategory(values.category);
    Account.validateName(values.name);
    Account.validateLimit(values.limit);

    values.balance = values.balance || 0;

    return new Account(values);
  }

  public transfer(account: Account, value: number) {
    if (!account) {
      throw new Error("An account must be informed to receive the value");
    }

    this.withdrawal(value);
    account.deposit(value);
  }

  private deposit(value: number) {
    Account.validateValue(value);

    this.values.balance += value;
  }

  private withdrawal(value: number) {
    Account.validateValue(value);

    let newBallance = this.getBalance() - value;
    if (newBallance < -this.getBalance())
      throw new Error("Amount withdrawn exceeds account limit");

    this.values.balance = newBallance;
  }

  private static validateValue(value: number) {
    if (value <= 0) {
      throw new Error("The value must be greater than zero");
    }
  }

  private static validateCategory(value: Categories) {
    if (!value) {
      throw new Error("Account must have a category");
    }
  }

  private static validateName(value: string) {
    if (!value) {
      throw new Error("Account must have a name");
    }
  }

  static validateLimit(value: number) {
    if (value === undefined || value < 0) {
      throw new Error("Account limit must be grater than or equals to zero");
    }
  }

  private creditar(valor: number) {
    switch (this.getCategory()) {
      case Categories.PASSIVOS:
      case Categories.PATRIMONIO:
      case Categories.RECEITAS:
        this.deposit(valor);
        break;

      case Categories.ATIVOS:
      case Categories.DESPESAS:
        this.withdrawal(valor);
        break;

      default:
        throw new Error("Categoria inválida");
    }
  }

  private debitar(valor: number) {
    switch (this.getCategory()) {
      case Categories.PASSIVOS:
      case Categories.PATRIMONIO:
      case Categories.RECEITAS:
        this.withdrawal(valor);
        break;

      case Categories.ATIVOS:
      case Categories.DESPESAS:
        this.deposit(valor);
        break;

      default:
        throw new Error("Categoria inválida");
    }
  }
}

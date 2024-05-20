import { AccountsRepository } from "../../repositories/AccountsRepository";
import { PrismaAccountsRepository } from "../../repositories/prisma/PrismaAccountsRepository";

export class PrismaFactory {
  private constructor() {}

  static createAccountRepository(): AccountsRepository {
    return new PrismaAccountsRepository();
  }
}

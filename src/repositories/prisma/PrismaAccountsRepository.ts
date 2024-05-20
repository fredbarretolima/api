import { PrismaClient } from "@prisma/client";
import { AccountVo, Categories } from "../../domain/vo/account-vo";
import { AccountsRepository } from "../AccountsRepository";
import { BadRequestError } from "../../middlewares/errors";

export class PrismaAccountsRepository implements AccountsRepository {
  private prisma = new PrismaClient();

  public async create(values: AccountVo): Promise<AccountVo> {
    let { category, name, balance } = values;
    const account = await this.prisma.account.create({
      data: { category, name, balance },
    });
    values.id = account.id;

    return values;
  }

  public async find(id: number): Promise<AccountVo> {
    const result = await this.prisma.account.findUnique({ where: { id } });
    if (result)
      return {
        id: result.id,
        category: result.category,
        name: result.name,
        balance: result.balance.toNumber(),
        limit: result.limit.toNumber(),
      };
    else throw new Error("Not Found");
  }

  public async findByCategory(category: Categories): Promise<AccountVo[]> {
    const result = await this.prisma.account.findMany({ where: { category } });
    return result.map((value) => ({
      id: value.id,
      category: value.category,
      name: value.name,
      balance: value.balance.toNumber(),
      limit: value.limit.toNumber()
    }));
  }

  public async update(values: AccountVo): Promise<AccountVo> {
    if (!values.id) {
      throw new Error("Invalid argument");
    }

    const result = await this.prisma.account.update({
      where: { id: values.id },
      data: values,
    });

    return {
      id: result.id,
      category: result.category,
      name: result.name,
      balance: result.balance.toNumber(),
      limit: result.limit.toNumber()
    };
  }

  public async delete(values: AccountVo): Promise<void> {
    if (!values.id) {
      throw new BadRequestError({message: "Please, inform the account id"});
    }

    await this.prisma.account.delete({ where: { id: values.id } });
  }

  public async list(): Promise<AccountVo[]> {
    const result = await this.prisma.account.findMany();
    return result.map((value) => ({
      id: value.id,
      category: value.category,
      name: value.name,
      balance: value.balance.toNumber(),
      limit: value.limit.toNumber(),
    }));
  }
}

import { Request, Response, Router } from "express";

import {
  AccountCreateDto,
  AccountLimitDto,
  AccountTransferDto,
} from "../domain/dto/account-dtos";

import { AccountsService } from "../services/AccountsService";

export class AccountsController {
  public constructor(readonly service: AccountsService) {}

  public routes(): Router {
    return (
      Router()
        // returns the accounts list
        .get("/", (req, res) => this.list(req, res))

        // retuns the account identified by id
        .get("/:id", (req, res) => this.find(req, res))

        // creates a new account must pass category, name
        // can inform limit too
        .post("/", (req, res) => this.create(req, res))

        // updates the account limitF
        .patch("/:id/limit", (req, res) => this.setLimit(req, res))

        // remove one account from db
        .delete("/:id", (req, res) => this.delete(req, res))

        .post("/:from/transfer/:to", (req, res) => this.transfer(req, res))
    );
  }

  public async create(req: Request, res: Response) {
    const values: AccountCreateDto = req.body;
    const account = await this.service.create(values);
    res.status(201).json(account.getValues());
  }

  public async find(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const account = await this.service.find(id);
    res.status(200).json(account.getValues());
  }

  public list = async (req: Request, res: Response) => {
    const result = await this.service.list();
    const accounts = result.map((value) => {
      return value.getValues();
    });

    return res.status(200).json(accounts);
  };

  public async setLimit(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const values: AccountLimitDto = req.body;

    const account = await this.service.setAccountLimit(id, values.limit);
    return res.status(200).json(account.getValues());
  }

  public async transfer(req: Request, res: Response) {
    const from = parseInt(req.params.from);
    const to = parseInt(req.params.to);
    const values: AccountTransferDto = req.body;
    await this.service.transfer(from, to, values.ammount);
    res.sendStatus(200);
  }

  public async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    this.service.delete(id);
  }
}

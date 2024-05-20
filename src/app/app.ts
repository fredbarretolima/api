import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import { AccountsController } from "../controllers/AccountsController";
import { errorHandler } from "../middlewares/errors";
import { AccountsService } from "../services/AccountsService";
import { PrismaFactory } from "./factories/PrismaFactory";

export class App {
  private express: express.Application;

  public constructor() {
    this.express = express();
    this.middlewares();
    this.accounts();
  }

  private middlewares(): void {
    this.express.use(express.json());
    this.express.use(cors());
    this.express.use(errorHandler);
  }

  private accounts() {
    const accountsRepository = PrismaFactory.createAccountRepository();
    const accountsService = new AccountsService(accountsRepository);
    const accountsController = new AccountsController(accountsService);
    this.express.use("/accounts", accountsController.routes());
  }

  public run() {
    dotenv.config();
    const PORTA = process.env.PORTA || 3333;
    this.express.listen(PORTA, () =>
      console.log(`App is runing at http://localhost:${PORTA}/`)
    );
  }
}

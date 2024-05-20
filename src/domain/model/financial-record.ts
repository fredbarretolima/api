import { AccountVo } from "../vo/account-vo";
import { Account } from "./account";
import { FinancialRecordVo } from "../vo/financial-record-vo";

export class FinancialRecord {
  private constructor(readonly vo: FinancialRecordVo) {}

  public getValues(): FinancialRecordVo {
    return { ...this.vo };
  }

  public getId(): number {
    return this.vo.id;
  }

  public getOriginAccount(): Account {
    return Account.fromVo(this.vo.originAccount);
  }

  public getDestinationAccount(): Account {
    return Account.fromVo(this.vo.destinationAccount);
  }

  public getValue(): number {
    return this.vo.value;
  }

  public getHistory(): string {
    return this.vo.history;
  }

  public getDate(): Date {
    return this.vo.date;
  }

  public static create(
    originAccount: AccountVo,
    destinationAccount: AccountVo,
    date: Date,
    history: string,
    value: number
  ): FinancialRecord {
    let vo: FinancialRecordVo = {
      id: 0,
      originAccount,
      destinationAccount,
      date,
      history,
      value,
    };
    return new FinancialRecord(vo);
  }

  public static fromVo(vo: FinancialRecordVo): FinancialRecord {
    return new FinancialRecord(vo);
  }
}

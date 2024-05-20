import { AccountVo } from "./account-vo";

export interface FinancialRecordVo {
  id: number;
  originAccount: AccountVo;
  destinationAccount: AccountVo;
  value: number;
  date: Date;
  history: string;
}

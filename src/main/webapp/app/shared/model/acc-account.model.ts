import dayjs from 'dayjs';
// import { IAccountType } from 'app/shared/model/account-type.model';
// import { ICurrency } from 'app/shared/model/currency.model';
// import { IBranch } from 'app/shared/model/branch.model';

export interface IAccAccount {
  id?: number;
  name?: string;
  asDate?: string | null;
  display?: boolean | null;
  initialBalance?: boolean | null;
  isSystemAccount?: boolean | null;
  isDeletable?: boolean | null;
  isEditable?: boolean | null;
  status?: boolean | null;
  isTreasuryAccount?: boolean | null;
  note?: string | null;
  initialBalanceFromAccount?: IAccAccount | null;
}

export const defaultValue: Readonly<IAccAccount> = {
  display: false,
  initialBalance: false,
  isSystemAccount: false,
  isDeletable: false,
  isEditable: false,
  status: false,
  isTreasuryAccount: false,
};

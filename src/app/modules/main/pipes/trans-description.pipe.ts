import { Pipe, PipeTransform } from '@angular/core';
import { Transaction } from '../../../models/TransferData.model';
import { Consts, IncomeExpenseType, TransactionType } from '../../../models/enums.model';

@Pipe({
  name: 'transDescription'
})
export class TransDescriptionPipe implements PipeTransform {

  transform(value: Transaction, ...args: unknown[]): string {
    switch (value.transactionType) {

      case TransactionType.BankTransfer:
        if (value.incomeExpense == IncomeExpenseType.Income)
          return `העברה בנקאית מ${value.counterpartyAccountName}`;
        else
          return `העברה בנקאית אל ${value.counterpartyAccountName}`;

      case TransactionType.CreateDeposit:
        if (value.accountNumber == Consts.accountNumberAdmin)
          return `פקדון מאת ${value.counterpartyAccountName}`;
        return `העברה לפקדון`; // regular user

      case TransactionType.CompleteDeposit:
        if (value.accountNumber == Consts.accountNumberAdmin)
          return `סיום פקדון של  ${value.counterpartyAccountName}`;
        return `סיום פקדון`; // regular user

      case TransactionType.WithdrawalDeposit:
        if (value.accountNumber == Consts.accountNumberAdmin)
          return `משיכת פקדון של  ${value.counterpartyAccountName}`;
        return `משיכת פקדון`; // regular user

      case TransactionType.UpdateDeposit:
        if (value.accountNumber == Consts.accountNumberAdmin)
          return `פעולת חסכון של  ${value.counterpartyAccountName}`;
        return `חסכון`; // regular user

      case TransactionType.Fee:
        if (value.accountNumber == Consts.accountNumberAdmin)
          return `קבלת עמלה של ${value.counterpartyAccountName}`;
        return `עמלה`;   // regular user


      default:
        return "פעולה לא ידועה";
    }
  }
}
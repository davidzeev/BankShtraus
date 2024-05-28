import { Component, OnInit } from '@angular/core';
import { DepositService } from '../../../../../services/deposit.service';
import { DepositsAccountDTO } from '../../../../../models/Deposits.model';
import { UserService } from '../../../../../services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-my-deposits',
  templateUrl: './my-deposits.component.html',
  styleUrls: ['./my-deposits.component.scss']
})
export class MyDepositsComponent implements OnInit {
  deposits: DepositsAccountDTO[] = [];
  accountNumber: number;
  displayedColumns: string[] = ['depositTypeName', 'interestRate', 'depositedAmount', 'dateStart', 'dateEnd', 'depositStatus', 'action'];

  constructor(
    private depositService: DepositService,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.accountNumber = this.userService.getAccountDetail()!.accountNumber;
  }

  ngOnInit(): void {
    this.loadDeposits();
  }

  loadDeposits(): void {
    this.depositService.getAllDepositsAccount(this.accountNumber).subscribe(
      (data: DepositsAccountDTO[]) => {
        this.deposits = data;
      },
      (error) => {
        console.error('Error loading deposits:', error);
      }
    );
  }

  cancelDeposit(depositId: number): void {
    this.depositService.cancelDeposit(depositId).subscribe(
      () => {
        this.snackBar.open('הפקדון בוטל בהצלחה!', 'סגור', { duration: 3000 });
        this.loadDeposits(); // טען מחדש את רשימת הפקדונות לאחר הביטול
      },
      (error) => {
        console.error('Error canceling deposit:', error);
      }
    );
  }
}

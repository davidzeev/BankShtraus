import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TransactionDataTable, transaction, transactionAccount } from '../../../../models/TransferData.model';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../services/api.service';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { LabelValue } from '../../../../models/labelValue.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpinnerService } from '../../../../services/spinner.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent implements AfterViewInit, OnDestroy {
  public dateOptions: LabelValue[] = [
    { label: 'מתחילת החודש', value: 0 },
    { label: 'חודש אחרון', value: 1 },
    { label: '3 חודשים אחרונים', value: 3 },
    { label: '6 חודשים אחרונים', value: 6 },
    { label: 'שנה אחרונה', value: 12 }
  ];
  public displayedColumns: string[] = ['date', 'description', 'amount', 'balance'];
  public dataSource = new MatTableDataSource<TransactionDataTable>();
  private subscription: Subscription = new Subscription();

  public transForm!: FormGroup;
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
  ) {
    this.transForm = this.fb.group<any>({
      month: [3],
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.getTranscationFromServer();
    this.subscription.add(
      this.transForm.controls['month'].valueChanges.subscribe(() => {
        this.getTranscationFromServer();
      }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private getTranscationFromServer(): void {
    let month = this.transForm.controls['month'].value;
    const fromDate = month ? this.utilsService.getDatePlus(0, -month, 0) : this.utilsService.FirstDayMonth();

    const querySearch: transactionAccount = {
      accountNumber: this.userService.getAccountDetail().accountNumber,
      fromDate: fromDate,
      toDate: new Date()
    };

    this.apiService.getTransaction(querySearch).subscribe({
      next: (transactions: transaction[]) => {
        const dataTable = transactions.map(transaction => {
          const date = new Date(transaction.date);
          const formattedDate = this.utilsService.dateToStringFormat(date);

          return {
            date: formattedDate,
            description: transaction.transactionType == 1 ? `העברה בנקאית מ${transaction.accountNameSender}` : "",
            amount: transaction.amount,
            balance: transaction.balance
          };
        });
        this.dataSource = new MatTableDataSource<TransactionDataTable>(dataTable);
      },
      error: (error) => {
        this.utilsService.handleServerError(error);
      }
    });

  }

  // ייצוא לאקסל
  public exportToExcel(): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'תנועות בחשבון');

    // Save to file
    XLSX.writeFile(wb, 'תנועות בחשבון שלי.xlsx');
  }

}

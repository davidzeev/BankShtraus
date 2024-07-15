import { Component, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Transaction, TransactionAccount } from '../../../../models/TransferData.model';
import * as XLSX from 'xlsx';
import { ApiService } from '../../../../services/api.service';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UtilsService } from '../../../../services/utils.service';
import { LabelValue } from '../../../../models/labelValue.model';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TransDialogComponent } from '../trans-dialog/trans-dialog.component';

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
  public dataSource = new MatTableDataSource<Transaction>();
  private subscription: Subscription = new Subscription();

  public transForm!: FormGroup;
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private utilsService: UtilsService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    this.transForm = this.fb.group<any>({
      month: [3],
    });
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<Transaction>([]);
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
    const toDate = this.utilsService.getDatePlus(0, 0, 1);

    const querySearch: TransactionAccount = {
      accountNumber: this.userService.getAccountDetail()!.accountNumber,
      fromDate: fromDate,
      toDate: toDate
    };

    this.apiService.getTransaction(querySearch).subscribe({
      next: (transactions: Transaction[]) => {
        this.dataSource.data = transactions;
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


  public openDialog(element: Transaction): void {
    const dialogRef = this.dialog.open(TransDialogComponent, {
      width: '500px',  // רוחב החלון
      height: '450px',  // רוחב החלון

      data: {
        trans: element
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

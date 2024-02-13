import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TransferData } from '../../../../models/TransferData.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-recent-transactions',
  templateUrl: './recent-transactions.component.html',
  styleUrl: './recent-transactions.component.scss'
})
export class RecentTransactionsComponent implements AfterViewInit {
  public displayedColumns: string[] = ['date', 'description', 'rightsAndObligations', 'balance'];
  public dataSource = new MatTableDataSource<TransferData>();
  private dataList = [
    { date: "1", description: "בדיקת אורך השורה של התיאור", rightsAndObligations: 1, balance: 123456 },
    { date: "12", description: "12", rightsAndObligations: -12, balance: 1111 },
    { date: "123", description: "123", rightsAndObligations: 123, balance: -12398 },
    { date: "4", description: "4", rightsAndObligations: 4, balance: 123454 },
    { date: "456", description: "456", rightsAndObligations: 456, balance: 87556 },
    { date: "1567567", description: "1", rightsAndObligations: 1, balance: 123456 },
    { date: "1243242", description: "12", rightsAndObligations: 12, balance: 1111 },
    { date: "12123123", description: "123", rightsAndObligations: -1234, balance: 12398 },
    { date: "412312", description: "4", rightsAndObligations: 1234, balance: 123454 },
    { date: "451235464566", description: "456", rightsAndObligations: 456, balance: 87556 },
    { date: "1567123567", description: "131", rightsAndObligations: 31, balance: 1323456 },
  ]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // אחרי שנטען התצוגה
  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<TransferData>(this.dataList);
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
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

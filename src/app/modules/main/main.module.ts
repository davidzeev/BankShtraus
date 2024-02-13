import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MyPaginatorIntl } from '../shared/general/myPaginatorIntl';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    MainComponent,
    PersonalAreaComponent,
    RecentTransactionsComponent,
    BankTransferComponent,
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl },
  ],
})
export class MainModule { }

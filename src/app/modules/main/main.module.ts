import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';


@NgModule({
  declarations: [
    MainComponent,
    PersonalAreaComponent,
    RecentTransactionsComponent,
    BankTransferComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }

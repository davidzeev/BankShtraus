import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MyPaginatorIntl } from '../shared/general/myPaginatorIntl';
import { HomeComponent } from './components/home/home.component';
import { TransDialogComponent } from './components/trans-dialog/trans-dialog.component';
import { TransDescriptionPipe } from './pipes/trans-description.pipe';
import { DepositsMainComponent } from './components/deposits/deposits-main/deposits-main.component';
import { MyDepositsComponent } from './components/deposits/my-deposits/my-deposits.component';
import { CreateDepositComponent } from './components/deposits/create-deposit/create-deposit.component';
import { ActiveDepositsComponent } from './components/deposits/active-deposits/active-deposits.component';
import { ExitStationPipe } from './pipes/exit-station.pipe';
import { DepositStatusPipe } from './pipes/deposit-status.pipe';


@NgModule({
  declarations: [
    MainComponent,
    PersonalAreaComponent,
    RecentTransactionsComponent,
    BankTransferComponent,
    HomeComponent,
    TransDialogComponent,
    TransDescriptionPipe,
    DepositsMainComponent,
    MyDepositsComponent,
    CreateDepositComponent,
    ActiveDepositsComponent,
    ExitStationPipe,
    DepositStatusPipe,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
  ],
  providers: [
    CurrencyPipe,
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl },
  ],
})
export class MainModule { }

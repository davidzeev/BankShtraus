import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { routingUrl } from '../../models/routing.model';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: routingUrl.personalArea, component: PersonalAreaComponent },
      { path: routingUrl.BankTransfer, component: BankTransferComponent },
      { path: routingUrl.RecentTranscations, component: RecentTransactionsComponent },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

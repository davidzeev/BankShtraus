import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { RoutingUrl } from '../../models/routing.model';
import { HomeComponent } from './components/home/home.component';
import { adminGuard } from './guards/admin.guard';
import { DepositsMainComponent } from './components/deposits/deposits-main/deposits-main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: RoutingUrl.home, component: HomeComponent },
      { path: RoutingUrl.personalArea, component: PersonalAreaComponent },
      { path: RoutingUrl.BankTransfer, component: BankTransferComponent },
      { path: RoutingUrl.RecentTranscations, component: RecentTransactionsComponent },
      { path: RoutingUrl.Deposits, component: DepositsMainComponent },
      { path: RoutingUrl.admin, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [adminGuard] },
      { path: '**', redirectTo: RoutingUrl.home },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

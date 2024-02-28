import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { PersonalAreaComponent } from './components/personal-area/personal-area.component';
import { BankTransferComponent } from './components/bank-transfer/bank-transfer.component';
import { RecentTransactionsComponent } from './components/recent-transactions/recent-transactions.component';
import { routingUrl } from '../../models/routing.model';
import { HomeComponent } from './components/home/home.component';
import { adminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      { path: routingUrl.home, component: HomeComponent },
      { path: routingUrl.personalArea, component: PersonalAreaComponent },
      { path: routingUrl.BankTransfer, component: BankTransferComponent },
      { path: routingUrl.RecentTranscations, component: RecentTransactionsComponent },
      { path: routingUrl.admin, loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [adminGuard] },
      { path: '**', redirectTo: routingUrl.home },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

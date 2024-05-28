import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingUrl } from '../../../models/routing.model';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { BugListComponent } from './components/bug-list/bug-list.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { UpdateGroupComponent } from './components/update-group/update-group.component';

const routes: Routes = [
  {
    path: "", component: MainAdminComponent, children: [
      { path: RoutingUrl.createAccount, component: CreateAccountComponent },
      { path: RoutingUrl.updateAccount, component: UpdateAccountComponent },
      { path: RoutingUrl.updateGroup, component: UpdateGroupComponent },
      { path: RoutingUrl.bugList, component: BugListComponent },
      { path: '**', redirectTo: "" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

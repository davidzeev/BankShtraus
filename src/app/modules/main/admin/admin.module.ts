import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { MainAdminComponent } from './components/main-admin/main-admin.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { UpdateAccountComponent } from './components/update-account/update-account.component';
import { UpdateGroupComponent } from './components/update-group/update-group.component';
import { BugListComponent } from './components/bug-list/bug-list.component';
import { SharedModule } from '../../shared/shared.module';
import { BugTypePipe } from './pipes/bug-type.pipe';
import { AccountBugsComponent } from './components/account-bugs/account-bugs.component';


@NgModule({
  declarations: [
    MainAdminComponent,
    CreateAccountComponent,
    UpdateAccountComponent,
    UpdateGroupComponent,
    BugListComponent,
    BugTypePipe,
    AccountBugsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }

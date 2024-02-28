import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { routingUrl } from './models/routing.model';
import { authGuard } from './modules/main/guards/auth.guard';

const routes: Routes = [
  { path: routingUrl.login, loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: routingUrl.main, loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule), canActivate: [authGuard] },
  { path: '**', redirectTo: routingUrl.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

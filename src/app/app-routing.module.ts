import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoutingUrl } from './models/routing.model';
import { authGuard } from './modules/main/guards/auth.guard';

const routes: Routes = [
  { path: RoutingUrl.login, loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: RoutingUrl.main, loadChildren: () => import('./modules/main/main.module').then(m => m.MainModule), canActivate: [authGuard] },
  { path: '**', redirectTo: RoutingUrl.login },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

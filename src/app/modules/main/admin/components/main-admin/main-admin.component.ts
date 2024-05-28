import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutingUrl } from '../../../../../models/routing.model';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.scss'
})
export class MainAdminComponent {

  constructor(private router: Router) { }

  // יצירת משתמש
  public routeCreateAccount(): void {
    this.router.navigate([RoutingUrl.createAccountFull]);
  }

  // עדכון משתמש
  public routeUpdateAccount(): void {
    this.router.navigate([RoutingUrl.updateAccountFull]);
  }

  // עדכון קבוצה
  public routeUpdateGroup(): void {
    this.router.navigate([RoutingUrl.updateGroupFull]);
  }

  // רשימת ניהול באגים
  public routeBugList(): void {
    this.router.navigate([RoutingUrl.bugListFull]);
  }

}
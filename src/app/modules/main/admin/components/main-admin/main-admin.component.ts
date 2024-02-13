import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routingUrl } from '../../../../../models/routing.model';

@Component({
  selector: 'app-main-admin',
  templateUrl: './main-admin.component.html',
  styleUrl: './main-admin.component.scss'
})
export class MainAdminComponent {

  constructor(private router: Router) { }

  // יצירת משתמש
  public routeCreateAccount(): void {
    this.router.navigate([routingUrl.createAccountFull]);
  }

  // עדכון משתמש
  public routeUpdateAccount(): void {
    this.router.navigate([routingUrl.updateAccountFull]);
  }

  // עדכון קבוצה
  public routeUpdateGroup(): void {
    this.router.navigate([routingUrl.updateGroupFull]);
  }

  // רשימת ניהול באגים
  public routeBugList(): void {
    this.router.navigate([routingUrl.bugListFull]);
  }

}
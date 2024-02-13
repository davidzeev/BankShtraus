import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routingUrl } from '../../../../models/routing.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  public isUserAdmin(): boolean {
    return true;
  };
  constructor(private router: Router) { }

  // דף הבית
  public routeHome(): void {
    this.router.navigate([routingUrl.homeFull]);
  }

  // אזור אישי
  public routePersonalArea(): void {
    this.router.navigate([routingUrl.personalAreaFull]);
  }

  // העברות בנקאיות
  public routeBankTransfer(): void {
    this.router.navigate([routingUrl.BankTransferFull]);
  }

  // תנועות בחשבון
  public routeRecentTranscations(): void {
    this.router.navigate([routingUrl.RecentTranscationsFull]);
  }

  // ניהול
  public routeAdmin(): void {
    this.router.navigate([routingUrl.adminFull]);
  }

  // ניתוק
  public logOut(): void {
    // reset service
    this.router.navigate([routingUrl.loginFull]);
  }
}

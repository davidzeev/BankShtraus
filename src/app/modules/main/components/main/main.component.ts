import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routingUrl } from '../../../../models/routing.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  public isAdmin: boolean = false;

  constructor(private router: Router, private userService: UserService) {
    this.isAdmin = this.userService.isAdminAccount();
  }

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
    this.router.navigate([routingUrl.loginFull]);
  }
}

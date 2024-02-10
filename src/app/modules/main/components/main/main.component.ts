import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routingUrl } from '../../../../models/routing.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

  constructor(private router: Router) { }

  public routePersonalArea(): void {
    this.router.navigate([routingUrl.personalAreaFull]);
  }

  public routeBankTransfer(): void {
    this.router.navigate([routingUrl.BankTransferFull]);
  }

  public routeRecentTranscations(): void {
    this.router.navigate([routingUrl.RecentTranscationsFull]);
  }
}

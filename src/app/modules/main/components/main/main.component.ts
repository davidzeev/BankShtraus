import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RoutingUrl } from '../../../../models/routing.model';
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

  public get RoutingUrl(): typeof RoutingUrl {
    return RoutingUrl;
  }

  public routeTo(url: RoutingUrl): void {
    this.router.navigate([url]);
  }

  // ניתוק
  public logOut(): void {
    // maybe add somthing
    this.router.navigate([RoutingUrl.loginFull]);
  }
}

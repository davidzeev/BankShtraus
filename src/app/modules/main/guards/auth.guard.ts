import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { RoutingUrl } from '../../../models/routing.model';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isLoginAccount()) {
    return true;
  }
  else {
    router.navigate([RoutingUrl.loginFull]);
    return false;
  }
};

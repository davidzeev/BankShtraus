import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { inject } from '@angular/core';
import { RoutingUrl } from '../../../models/routing.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAdminAccount()) {
    return true;
  }
  else {
    router.navigate([RoutingUrl.mainFull]);
    return false;
  }
};

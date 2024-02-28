import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { inject } from '@angular/core';
import { routingUrl } from '../../../models/routing.model';

export const adminGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  if (userService.isAdminAccount()) {
    return true;
  }
  else {
    router.navigate([routingUrl.mainFull]);
    return false;
  }
};

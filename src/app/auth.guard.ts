import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const jwt = sessionStorage.getItem('jwt');
  if (jwt) {
    return true;
  } else {
    const router = new Router();
    router.navigate(['/login']); // Redirect to login page
    return false;
  }
};

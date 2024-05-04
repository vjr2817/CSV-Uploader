import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const authGuard = () => {

    const router = inject(Router);
    const authService = inject(AuthService);
    if (authService.getUserLoggedIN()) {
      return true;
    }
    // Redirect to the login page
    return router.navigate(['/login'],{
        state: {
            'message': 'Authentication Failure, Login Required.'
        }
    });
  };
  
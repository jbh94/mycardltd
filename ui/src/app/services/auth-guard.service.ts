import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): Observable<boolean> {
    return this.authService.isUserLoggedIn$.pipe(
      take(1),  // Take only one value and complete the observable
      map(isLoggedIn => {
        if (!isLoggedIn) {
          this.router.navigate(['signup']);
          return false;
        }
        return true;
      })
    );
  }

  canActivateChild(): Observable<boolean> {
    return this.canActivate(); // Use the same logic for child routes
  }
}

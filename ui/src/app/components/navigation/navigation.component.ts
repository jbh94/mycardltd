import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuthenticated: Boolean = false;

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn: Boolean) => {
      this.isAuthenticated = isLoggedIn
    })
  }

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }

}

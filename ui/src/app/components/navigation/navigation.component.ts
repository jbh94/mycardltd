import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  isAuthenticated: Boolean = false;

  isMenuVisible: boolean = true;

  ngOnInit(): void {
    this.authService.isUserLoggedIn$.subscribe((isLoggedIn: Boolean) => {
      this.isAuthenticated = isLoggedIn
    })
  }

  constructor(private authService: AuthService, private router: Router) { }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.updateMenuVisibility();
  }

  toggleMenu() {
    const menu = document.querySelector('#menu') as HTMLElement;
    menu.classList.toggle('hidden');
  }

  updateMenuVisibility() {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 768) {
      this.isMenuVisible = true;
    } else {
      const menu = document.querySelector('#menu') as HTMLElement;
      if (!menu.classList.contains('hidden')) {
        this.isMenuVisible = true;
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.authService.isUserLoggedIn$.next(false);
    this.router.navigate(["login"]);
  }

}

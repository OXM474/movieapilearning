import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'movies_api_learning';
  constructor(private auth: AuthService, private router: Router) {}
  ngOnInit(): void {
    const isLoggedIn = this.auth.isAuthenticated();
    if (isLoggedIn) {
    } else
      () => {
        this.router.navigateByUrl('login');
      };
  }
}

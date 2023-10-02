import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private cookieservice: CookieService) {}
  private readonly storgeKey = 'isLoggedIn';

  login() {
    localStorage.setItem(this.storgeKey, 'true');
  }

  logout() {
    localStorage.removeItem(this.storgeKey);
  }

  isAuthenticated(): Boolean {
    return localStorage.getItem(this.storgeKey) === 'true';
  }
}

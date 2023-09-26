import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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

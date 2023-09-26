import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/interface/movieresult';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(
    private Router: Router,
    private getapi: GetapiService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.Router.events.subscribe(() => {
      if (NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  useremail: string = '';
  password: string = '';
  logcfn: string = '';
  login() {
    var result = this.getapi.login({
      email: this.useremail,
      password: this.password,
    });
    this.auth.login();
    result.subscribe({
      next: (uslogin: Login) => {
        if (uslogin.status == 'success') {
          this.logcfn = uslogin.status;
          this.Router.navigateByUrl('home');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Something Wrong or Password Wrong!');
        console.log(err);
      },
    });
  }
}

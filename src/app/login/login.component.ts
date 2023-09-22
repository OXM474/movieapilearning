import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(private Router: Router, private getapi: GetapiService) {}
  ngOnInit(): void {
    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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

    result.subscribe({
      next: (uslogin: any) => {
        console.log(uslogin.data);
        if (uslogin.status == 'success') {
          this.logcfn = uslogin.status;
          this.Router.navigateByUrl('');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Something Wrong or Password Wrong!');
        console.log(err);
      },
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/interface/movieresult';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private Router: Router, private getapi: GetapiService) {}
  loading: boolean = false;
  ngOnInit(): void {
    this.Router.events.subscribe(() => {
      if (NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  signupform = new FormGroup({
    UserFirstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    UserLastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(10),
    ]),
    UserEmail: new FormControl('', [Validators.required, Validators.email]),
    UserPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    ConfirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    gender: new FormControl('', [Validators.required]),
    check: new FormControl(false, [Validators.required]),
  });

  showPassword: boolean = false;
  signup() {
    var resultsignup = this.getapi.signup({
      name:
        this.signupform.get('UserFirstName')?.value +
        ' ' +
        this.signupform.get('UserLastName')?.value,
      email: this.signupform.get('UserEmail')?.value,
      password: this.signupform.get('UserPassword')?.value,
      passwordConfirm: this.signupform.get('ConfirmPassword')?.value,
    });
    this.loading = true;
    resultsignup.subscribe({
      next: (ussignup: Login) => {
        console.log(ussignup.data);
        if (ussignup.status == 'success') {
          this.Router.navigateByUrl('/login');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Email of Password Invalid!');
        console.log(err);
      },
    });
    setTimeout(() => {
      this.loading = false;
    }, 3000);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
  ngOnInit(): void {
    this.Router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
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
    gender: new FormControl('Gender', [Validators.required]),
    check: new FormControl(false, [Validators.required]),
  });

  showPassword: boolean = false;
  signup() {
    var resultsignup = this.getapi.signup({
      name: this.signupform.get('UserFirstName' + 'UserLastName'),
      email: this.signupform.get('UserEmail'),
      password: this.signupform.get('UserPassword'),
      passwordConfirm: this.signupform.get('ConfirmPassword'),
    });
    resultsignup.subscribe({
      next: (ussignin: Login) => {
        console.log(ussignin.data);
        if (ussignin.status == 'success') {
          this.Router.navigateByUrl('');
        }
      },
      error: (err: HttpErrorResponse) => {
        alert('Email of Password Invalid!');
        console.log(err);
      },
    });
  }
  click() {
    console.log(this.signupform.get('UserFirstName')?.value);
  }
}

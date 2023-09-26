import { Component, OnDestroy, OnInit } from '@angular/core';
import { Result, Movie } from 'src/interface/movieresult';
import { HttpErrorResponse } from '@angular/common/http';
import { GetapiService } from '../getapi.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css'],
})
export class PopularComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private getapi: GetapiService,
    private auth: AuthService
  ) {}
  popular: Result[] = [];
  login = this.auth.isAuthenticated();
  moviesub: Subscription = new Subscription();
  ngOnInit(): void {
    const popesult = this.getapi.getapi('popular');
    this.moviesub = popesult.subscribe({
      next: (res: Movie) => {
        this.popular = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.moviesub.unsubscribe;
  }
  sigout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}

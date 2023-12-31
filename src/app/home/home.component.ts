import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, UnsubscriptionError } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { Movie, Result } from '../../interface/movieresult';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private router: Router,
    private auth: AuthService
  ) {}

  login = this.auth.isAuthenticated();
  nowplaying: Result[] = [];
  popular: Result[] = [];
  toprated: Result[] = [];
  upcoming: Result[] = [];

  search: string = '';
  searchedmovie: Result[] = [];

  moviesub: Subscription = new Subscription();

  ngOnInit(): void {
    const poresult = this.getapi.getapi('now_playing', 1);
    this.moviesub = poresult.subscribe({
      next: (res: Movie) => {
        this.nowplaying = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const npresult = this.getapi.getapi('popular', 1);
    this.moviesub = npresult.subscribe({
      next: (res: Movie) => {
        this.popular = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const trresult = this.getapi.getapi('top_rated', 1);
    this.moviesub = trresult.subscribe({
      next: (res: Movie) => {
        this.toprated = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const ucresult = this.getapi.getapi('upcoming', 1);
    this.moviesub = ucresult.subscribe({
      next: (res: Movie) => {
        this.upcoming = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this.router.events.subscribe(() => {
      if (NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  ngOnDestroy(): void {
    this.moviesub.unsubscribe;
  }
  detial(movieid: number) {
    this.router.navigateByUrl('/detail' + movieid);
    setTimeout(() => {
      window.location.reload();
    }, 400);
    if (NavigationEnd) {
      window.scrollTo(0, 0);
    }
  }
  sigout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  searchmovie(search: string) {
    this.router.navigateByUrl('/search/' + search);
    setTimeout(() => {
      window.location.reload();
    }, 400);
    if (NavigationEnd) {
      window.scrollTo(0, 0);
    }
  }
}

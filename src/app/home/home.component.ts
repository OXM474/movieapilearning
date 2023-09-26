import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription, UnsubscriptionError } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Movie, Result } from '../../interface/movieresult';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private selectedMovieData = new BehaviorSubject<{
    id: number;
    overview: string;
  } | null>(null);

  get selectedMovieData$() {
    return this.selectedMovieData.asObservable();
  }

  setSelectedMovieData(data: { id: number; overview: string }) {
    this.selectedMovieData.next(data);
  }

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

  moviesub: Subscription = new Subscription();

  ngOnInit(): void {
    const poresult = this.getapi.getapi('now_playing');
    this.moviesub = poresult.subscribe({
      next: (res: Movie) => {
        this.nowplaying = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const npresult = this.getapi.getapi('popular');
    this.moviesub = npresult.subscribe({
      next: (res: Movie) => {
        this.popular = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const trresult = this.getapi.getapi('top_rated');
    this.moviesub = trresult.subscribe({
      next: (res: Movie) => {
        this.toprated = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const ucresult = this.getapi.getapi('upcoming');
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
}

import { Component, OnInit } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
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

  constructor(private getapi: GetapiService, private router: Router) {}

  nowplaying = [];
  popular = [];
  toprated = [];
  upcoming = [];

  moviesub: Subscription = new Subscription();

  ngOnInit(): void {
    const poresult = this.getapi.getapi('now_playing');
    this.moviesub = poresult.subscribe({
      next: (res: any) => {
        this.nowplaying = res['results'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const npresult = this.getapi.getapi('popular');
    this.moviesub = npresult.subscribe({
      next: (res: any) => {
        this.popular = res['results'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const trresult = this.getapi.getapi('top_rated');
    this.moviesub = trresult.subscribe({
      next: (res: any) => {
        this.toprated = res['results'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const ucresult = this.getapi.getapi('upcoming');
    this.moviesub = ucresult.subscribe({
      next: (res: any) => {
        this.upcoming = res['results'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }
  detial(movieid: number) {
    this.router.navigateByUrl('/detil/' + movieid);
  }
  nowplayingpage() {
    this.router.navigateByUrl('/nowplaying');
  }
  upcomingpage() {
    this.router.navigateByUrl('/nowplaying');
  }
  popularpage() {
    this.router.navigateByUrl('/nowplaying');
  }
  topratedpage() {
    this.router.navigateByUrl('/nowplaying');
  }
}

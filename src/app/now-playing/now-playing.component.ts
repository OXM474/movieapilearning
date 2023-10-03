import { Component, OnInit, OnDestroy } from '@angular/core';
import { Result, Movie } from 'src/interface/movieresult';
import { GetapiService } from '../getapi.service';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-now-playing',
  templateUrl: './now-playing.component.html',
  styleUrls: ['./now-playing.component.css'],
})
export class NowPlayingComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private auth: AuthService,
    private router: Router
  ) {}
  search: string = '';
  login = this.auth.isAuthenticated();
  nowplaying: Result[] = [];
  moviesub: Subscription = new Subscription();
  page: number = 1;
  ngOnInit(): void {
    const nplesult = this.getapi.getapi('now_playing', this.page);
    this.moviesub = nplesult.subscribe({
      next: (res: Movie) => {
        this.nowplaying = res.results!;
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

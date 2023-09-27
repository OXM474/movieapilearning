import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { Result, Movie } from 'src/interface/movieresult';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-toprated',
  templateUrl: './toprated.component.html',
  styleUrls: ['./toprated.component.css'],
})
export class TopratedComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private router: Router,
    private auth: AuthService
  ) {}
  search: string = '';
  toprated: Result[] = [];
  login = this.auth.isAuthenticated();
  moviesub: Subscription = new Subscription();
  ngOnInit(): void {
    const topesult = this.getapi.getapi('top_rated');
    this.moviesub = topesult.subscribe({
      next: (res: Movie) => {
        this.toprated = res.results!;
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

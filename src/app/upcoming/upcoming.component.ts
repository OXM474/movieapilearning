import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { Result, Movie } from 'src/interface/movieresult';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
@Component({
  selector: 'app-upcoming',
  templateUrl: './upcoming.component.html',
  styleUrls: ['./upcoming.component.css'],
})
export class UpcomingComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private auth: AuthService,
    private router: Router
  ) {}
  search: string = '';
  upcoming: Result[] = [];
  login = this.auth.isAuthenticated();
  moviesub: Subscription = new Subscription();
  ngOnInit(): void {
    const upcresult = this.getapi.getapi('upcoming');
    this.moviesub = upcresult.subscribe({
      next: (res: Movie) => {
        this.upcoming = res.results!;
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

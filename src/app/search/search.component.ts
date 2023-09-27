import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Movie, Result } from 'src/interface/movieresult';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private ActivatedRoute: ActivatedRoute,
    private auth: AuthService,
    private router: Router
  ) {}

  login = this.auth.isAuthenticated();

  search: string = '';
  searchedmovie: Result[] = [];

  moviesub: Subscription = new Subscription();

  searchmovielist() {
    const sermov = this.getapi.search(this.search);
    this.moviesub = sermov.subscribe({
      next: (res: Movie) => {
        this.searchedmovie = res.results!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }

  async ngOnInit(): Promise<void> {
    this.search = await this.ActivatedRoute.snapshot.params['searchword'];
    this.searchmovielist();
  }
  sigout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  ngOnDestroy(): void {
    this.moviesub.unsubscribe;
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

import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  Moviedetail,
  TrailersResult,
  Trailers,
  Movie,
  Result,
} from 'src/interface/movieresult';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-detil',
  templateUrl: './detil.component.html',
  styleUrls: ['./detil.component.css'],
})
export class DetilComponent implements OnInit, OnDestroy {
  constructor(
    private getapi: GetapiService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {}
  moviedetil: any = [];
  movieid!: number;
  genres: any = [];
  actors: any = [];
  trailer: TrailersResult[] = [];
  officialTrailers: any = [];
  officialtrailerkey: string = '';
  similar: Result[] = [];
  moviesub: Subscription = new Subscription();
  search: string = '';

  login = this.auth.isAuthenticated();

  async ngOnInit(): Promise<void> {
    this.movieid = await this.ActivatedRoute.snapshot.params['movieid'];
    const movedt = await this.getapi.getMovieDetails(this.movieid);
    this.moviesub = movedt.subscribe({
      next: (res: Moviedetail) => {
        this.moviedetil = res;
        this.genres = res.genres;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const moveactors = await this.getapi.getactors(this.movieid);
    this.moviesub = moveactors.subscribe({
      next: (act: any) => {
        this.actors = act['cast'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const trail = await this.getapi.gettrailer(this.movieid);
    this.moviesub = trail.subscribe({
      next: (tril: Trailers) => {
        this.trailer = tril['results']!;
        this.officialTrailers = this.trailer.filter(
          (item) => item.type === 'Trailer'
        );
        this.officialtrailerkey = this.officialTrailers[0]['key'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const smiilar = this.getapi.getsimilar(this.movieid);
    this.moviesub = smiilar.subscribe({
      next: (sm: Movie) => {
        this.similar = sm['results']!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  ngOnDestroy(): void {
    this.moviesub.unsubscribe;
  }
  getYear(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year.toString();
  }
  sigout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
  getactor(actorid: number) {
    this.router.navigateByUrl('/actor/' + actorid);
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

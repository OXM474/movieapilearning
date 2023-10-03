import {
  Component,
  OnInit,
  OnDestroy,
  importProvidersFrom,
} from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-detil',
  templateUrl: './detil.component.html',
  styleUrls: ['./detil.component.css'],
})
export class DetilComponent implements OnInit, OnDestroy {
  safeurl: SafeResourceUrl = '';
  youtubelink: string = '';
  constructor(
    private getapi: GetapiService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private scan: DomSanitizer
  ) {}

  getyoutubeurl() {
    this.youtubelink =
      'https://www.youtube.com/embed/' + this.officialtrailerkey + '?volume=30';
    this.safeurl = this.scan.bypassSecurityTrustResourceUrl(this.youtubelink);
  }

  moviedetil: any = [];
  movieid!: number;
  genres: any = [];
  actors: any = [];
  trailer: TrailersResult[] = [];
  trailer1: TrailersResult[] = [];
  officialTrailers: any = [];
  officialtrailerkey: string = '';
  similar: Result[] = [];
  moviesub: Subscription = new Subscription();
  search: string = '';
  Date = Date.now();
  loading: boolean = true;

  login = this.auth.isAuthenticated();
  gettrailer(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.getapi.gettrailer(this.movieid).subscribe({
        next: (tra: Trailers) => {
          this.trailer = tra.results!;
          this.officialTrailers = this.trailer.filter(
            (key) => key.type === 'Trailer'
          );
          this.officialtrailerkey = this.officialTrailers[0]['key'];
          resolve(this.officialtrailerkey);
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          reject(err);
        },
      });
    });
  }
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
    const smiilar = this.getapi.getsimilar(this.movieid);
    this.moviesub = smiilar.subscribe({
      next: (sm: Movie) => {
        this.similar = sm['results']!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    await this.gettrailer();
    await this.getyoutubeurl();
    setTimeout(() => {
      this.loading = false;
    }, 900);
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

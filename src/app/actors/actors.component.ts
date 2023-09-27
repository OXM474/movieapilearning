import { Component, OnInit, OnDestroy } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Actors, ActorsMovie, ActorCast } from 'src/interface/movieresult';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css'],
})
export class ActorsComponent implements OnInit, OnDestroy {
  constructor(
    private auth: AuthService,
    private router: Router,
    private getapi: GetapiService,
    private ActivatedRoute: ActivatedRoute
  ) {}

  search: string = '';
  actorid!: number;
  actordetail: any = []!;
  actormovies: ActorCast[] = [];
  birthday: any = this.actordetail['birthday'];
  login = this.auth.isAuthenticated();

  moviesub: Subscription = new Subscription();

  async ngOnInit(): Promise<void> {
    this.actorid = await this.ActivatedRoute.snapshot.params['actorid'];
    const movedt = await this.getapi.getactordetails(this.actorid);
    this.moviesub = movedt.subscribe({
      next: (res: Actors) => {
        this.actordetail = res!;
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const actmovdt = await this.getapi.getactormovie(this.actorid);
    this.moviesub = actmovdt.subscribe({
      next: (res: ActorsMovie) => {
        this.actormovies = res['cast']!;
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
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
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

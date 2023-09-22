import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { GetapiService } from '../getapi.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detil',
  templateUrl: './detil.component.html',
  styleUrls: ['./detil.component.css'],
})
export class DetilComponent implements OnInit {
  constructor(
    private getapi: GetapiService,
    private ActivatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  moviedetil: any = [];
  movieid!: number;
  genres: any = [];
  actors: any = [];
  moviesub: Subscription = new Subscription();

  ngOnInit() {
    this.movieid = this.ActivatedRoute.snapshot.params['movieid'];
    const movedt = this.getapi.getMovieDetails(this.movieid);
    this.moviedetil = movedt.subscribe({
      next: (res: any) => {
        this.moviedetil = res;
        this.genres = res['genres'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
    const moveactors = this.getapi.getactordetil(this.movieid);
    this.actors = moveactors.subscribe({
      next: (act: any) => {
        this.actors = act['cast'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      },
    });
  }
  getYear(dateString: string): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    return year.toString();
  }
  // async ngOnInit() {
  // this.movieid = this.ActivatedRoute.snapshot.params['id'];
  // this.contain = this.ActivatedRoute.snapshot.params['contain'];
  // console.log('before');
  // await this.getmoviedetil();
  // console.log('after');
  // const moviedt = this.getapi.getapi(this.contain);
  // this.moviesub = moviedt.subscribe({
  //   next: (res: any) => {
  //     this.moviedetil = res['results'];
  //   },
  //   error: (err: HttpErrorResponse) => {
  //     console.log(err);
  //   },
  // });
  // }
  // getmoviedetil() {
  //   return new Promise((resolve) => {
  //     var result = this.getapi.getapi(this.contain);
  //     this.moviesub = result.subscribe({
  //       next: (reso: any) => {
  //         console.log(reso);
  //         this.moviedetil = reso['results'];
  //         resolve(true);
  //       },
  //       error: (err: HttpErrorResponse) => {
  //         console.log(err);
  //         resolve(false);
  //       },
  //     });
  //   });
  // }
}

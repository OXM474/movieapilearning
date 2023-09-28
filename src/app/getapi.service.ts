import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GetapiService {
  constructor(private http: HttpClient) {}

  baseURL: string = 'https://api.themoviedb.org/3/movie/';
  actorbaseURL: string = 'https://api.themoviedb.org/3/person/';
  apikey: string = '6e7a2a802b323ac45305779e663bfda6';

  getapi(contain: string) {
    // console.log(contain);
    return this.http.get(
      `${this.baseURL}${contain}?api_key=${this.apikey}&language=en-US&page=1`
    );
  }
  getactors(movieid: number) {
    return this.http.get(
      `${this.baseURL}${movieid}/credits?api_key=${this.apikey}`
    );
  }
  getMovieDetails(movieid: number) {
    return this.http.get(
      `${this.baseURL}${movieid}?api_key=${this.apikey}&language=en-US`
    );
  }
  gettrailer(movieid: number) {
    return this.http.get(
      `${this.baseURL}${movieid}/videos?api_key=${this.apikey}`
    );
  }
  getsimilar(moveid: number) {
    return this.http.get(
      `${this.baseURL}${moveid}/similar?api_key=${this.apikey}&language=en-US&page=1`
    );
  }
  getactordetails(actorid: number) {
    return this.http.get(
      `${this.actorbaseURL}${actorid}?api_key=${this.apikey}&language=en-US`
    );
  }
  getactormovie(actorid: number) {
    return this.http.get(
      `${this.actorbaseURL}${actorid}/movie_credits?api_key=${this.apikey}&language=en-US`
    );
  }
  search(searchword: string) {
    return this.http.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${this.apikey}&query=${searchword}`
    );
  }
  // https://api.themoviedb.org/3/movie/now_playing?api_key=6e7a2a802b323ac45305779e663bfda6&language=en-US&page=1
  // http://api.themoviedb.org/3/movie/453395/credits?api_key=6e7a2a802b323ac45305779e663bfda6
  // https://api.themoviedb.org/3/movie/459003?api_key=6e7a2a802b323ac45305779e663bfda6&language=en-US
  // https://image.tmdb.org/t/p/w500//iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg
  // https://image.tmdb.org/t/p/original/iIvQnZyzgx9TkbrOgcXx0p7aLiq.jpg
  // https://api.themoviedb.org/3/movie/385687/similar?api_key=6e7a2a802b323ac45305779e663bfda6&language=en-US&page=1
  // https://api.themoviedb.org/3/movie/968051/videos?api_key=6e7a2a802b323ac45305779e663bfda6
  // https://api.themoviedb.org/3/person/3896?api_key=6e7a2a802b323ac45305779e663bfda6&language=en-US
  // https://api.themoviedb.org/3/person/3896/movie_credits?api_key=6e7a2a802b323ac45305779e663bfda6&language=en-US
  // https://api.themoviedb.org/3/search/movie?api_key=6e7a2a802b323ac45305779e663bfda6&query={search word}

  loginUrl: string = 'https://msi.htoowaiyan.com/api/v1/users/signin';
  signupUrl: string = 'https://msi.htoowaiyan.com/api/v1/users/signup';

  // data = {
  // email: this.uslogin.useremail,
  // password: this.uslogin.password,
  // };

  option = {
    headers: new HttpHeaders({
      Accept: 'text/html,application/json',
      'Contant-text': 'application/jason',
    }),
  };

  login(userdata: any) {
    return this.http.post(this.loginUrl, userdata, this.option);
  }

  signup(signupdata: any) {
    return this.http.post(this.signupUrl, signupdata, this.option);
  }
}

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/interface/movieresult';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
})
export class MovielistComponent {
  @Input() movielist: Result[] = [];
  @Input() Des: string = '';
  @Input() contain: string = '';
  constructor(private router: Router) {}
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
  }
  movielistdetial(con: string) {
    this.router.navigateByUrl(`/${con}`);
  }
}

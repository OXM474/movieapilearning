import { Component, Input } from '@angular/core';
import { Result } from 'src/interface/movieresult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movielistdetial',
  templateUrl: './movielistdetial.component.html',
  styleUrls: ['./movielistdetial.component.css'],
})
export class MovielistdetialComponent {
  constructor(private router: Router) {}
  @Input() movielistdetial: Result[] = [];
  @Input() Des: string = '';
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
  }
  refresh() {
    window.location.reload();
  }
}

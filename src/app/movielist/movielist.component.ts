import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Result } from 'src/interface/movieresult';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
})
export class MovielistComponent implements OnInit {
  @Input() movielist: Result[] = [];
  @Input() Des: string = '';
  @Input() contain: string = '';
  loading: boolean = true;
  constructor(private router: Router) {}
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
  }
  movielistdetial(con: string) {
    this.router.navigateByUrl(`/${con}`);
  }
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 900);
  }
}

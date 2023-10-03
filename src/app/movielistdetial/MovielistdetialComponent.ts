import { Component, Input, OnInit } from '@angular/core';
import { Result } from 'src/interface/movieresult';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movielistdetial',
  templateUrl: './movielistdetial.component.html',
  styleUrls: ['./movielistdetial.component.css'],
})
export class MovielistdetialComponent implements OnInit {
  constructor(private router: Router) {}
  @Input() movielistdetial: Result[] = [];
  @Input() Des: string = '';
  loading: boolean = true;
  page: number = 1;
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 900);
  }
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
  }
  refresh() {
    window.location.reload();
  }
  nextpage() {
    this.page = this.page + 1;
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
  previouspage() {
    this.page = this.page - 1;
    setTimeout(() => {
      window.location.reload();
    }, 400);
  }
}

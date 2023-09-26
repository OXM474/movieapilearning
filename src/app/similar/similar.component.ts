import { Component, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Result } from 'src/interface/movieresult';

@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css'],
})
export class SimilarComponent {
  constructor(private router: Router) {}
  @Input() similarlist: Result[] = [];
  @Input() sml: string = '';
  detial(movieid: number) {
    this.router.navigateByUrl('/detail/' + movieid);
    setTimeout(() => {
      window.location.reload();
    }, 400);
    if (NavigationEnd) {
      window.scrollTo(0, 0);
    }
  }
}

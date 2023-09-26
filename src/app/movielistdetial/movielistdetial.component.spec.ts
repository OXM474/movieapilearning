import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovielistdetialComponent } from './MovielistdetialComponent';

describe('MovielistdetialComponent', () => {
  let component: MovielistdetialComponent;
  let fixture: ComponentFixture<MovielistdetialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovielistdetialComponent],
    });
    fixture = TestBed.createComponent(MovielistdetialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

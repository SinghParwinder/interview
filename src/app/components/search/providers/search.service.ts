import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private pageNumber = new BehaviorSubject<number>(1);
  page = this.pageNumber.asObservable();

  private lastMovies = new BehaviorSubject<string>('');
  movie = this.lastMovies.asObservable();
  constructor() { }

  updatePage(value: number) {
    this.pageNumber.next(value);
  }

  updateMovie(value: string) {
    this.lastMovies.next(value);
  }
}

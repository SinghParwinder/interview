import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * Provider for managing pagination.
 * This service contains the state of the page number and the last movie serached.
 * In this way when users return from details component back to search component, they don't have to 
 * research again!
 */
@Injectable({
  providedIn: 'root'
})
export class SearchService {

  /**
   *  These are 2 BehaviorSubjects(one for page number and one for last search) and correspondent Observables; 
   */
  private pageNumber = new BehaviorSubject<number>(1);
  page = this.pageNumber.asObservable();

  private lastMovies = new BehaviorSubject<string>('');
  movie = this.lastMovies.asObservable();
  constructor() { }

  /**
   * Method to update the value of pageNumber BehaviorSubject
   * @param value new value
   */
  updatePage(value: number) {
    this.pageNumber.next(value);
  }

  /**
    * Method to update the value of lastMovies BehaviorSubject
    * @param value new value
    */
  updateMovie(value: string) {
    this.lastMovies.next(value);
  }
}

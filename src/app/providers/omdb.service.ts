import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';

/**
 * This service is used to load data from backend(OMDB API)
 */
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  api: string = '&apikey=1814f515';
  url: string = 'http://www.omdbapi.com/?&type=movie&';
  private lastSearchData = new BehaviorSubject<any[]>([]);
  private loadingValue = new BehaviorSubject<boolean>(false);
  lastSearch = this.lastSearchData.asObservable();
  loading = this.loadingValue.asObservable();

  constructor(private http: HttpClient) { }

  /**
   * Used to get movies search from OMDB API -> adn to update the value of BehaviorSubjects
   * @param value value to search
   * @param page page number
   */
  search(value: string, page: number) {
    this.loadingValue.next(true);
    this.http.get<any>(this.url + 's=' + value + '&page=' + page + this.api).subscribe(
      response => {
        if (response.Response == 'True') {
         this.lastSearchData.next(response.Search);
        } else {
          this.lastSearchData.next([]);
        }
        this.loadingValue.next(false);
      }
    );
  }

  /**
   * Method to get all movie details from OMDB API
   * @param id id of the movie  
   */
  getMovieDetails(id: string): Observable<Movie> {
    return this.http.get<Movie>(this.url + 'i=' + id + this.api);
  }
}

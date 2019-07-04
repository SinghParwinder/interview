import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * This service is used to load data from backend(OMDB API)
 */
@Injectable({
  providedIn: 'root'
})
export class OmdbService {
  api: string = '&apikey=1814f515';
  url: string = 'http://www.omdbapi.com/?';

  constructor(private http: HttpClient) { }

  /**
   * Used to get movies search from OMDB API
   * @param value value to search
   * @param page page of to result to load
   */
  search(value: string, page: number): Observable<any> {
    return this.http.get<any>(this.url + 's=' + value + '&page=' + page + this.api);
  }

  /**
   * Method to get all movie details from OMDB API
   * @param id id of movie  
   */
  getMovieDetails(id: string): Observable<any> {
    return this.http.get<any>(this.url + 'i=' + id + this.api);
  }
}

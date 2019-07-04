import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';
import { OmdbService } from 'src/app/providers/omdb.service';
import { SearchService } from './providers/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  firstLoad: boolean = true;
  isLoading: boolean = false;
  message: string = "Search a movie by name";
  results: any[] = [];
  page: number = 1;
  movieName: string = '';
  searchField: FormControl = new FormControl();

  constructor(
    private movieService: OmdbService,
    private localService: SearchService,
    private router: Router
    ) { }

  ngOnInit() {
    this.localService.page.subscribe(
      value => {
        this.page = value; 
      }
    );
    this.localService.movie.subscribe(
      value => {
        this.movieName = value; 
      }
    );
    this.movieService.loading.subscribe(
      value => {
        this.isLoading = value; 
      }
    );
    this.movieService.lastSearch.subscribe(
      value => {
        this.results = value; 
        this.results.filter(el => {
          if(el.Poster == 'N/A' || el.Poster.substring(0, 5) == 'http:') {
            el.Poster = 'assets/no-av.png'
          } 
        });
      }
    );

    this.searchField.valueChanges.pipe(
      debounceTime(1000)
      ).subscribe(
        queryField => {
          this.localService.updatePage(1);
          this.localService.updateMovie(queryField);
          this.movieService.search(queryField, this.page);
          this.firstLoad = false;
        }
    );
  }

  moviedetails(id: string) {
    this.router.navigate(['/movie', id]);
  }

  loadPage(value: number) {
    this.isLoading = true;
    this.localService.updatePage(this.page + value);
    this.movieService.search(this.movieName, this.page);
  }
}

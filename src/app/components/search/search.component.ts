import { Component, OnInit } from '@angular/core';
import { OmdbService } from 'src/app/providers/omdb.service';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  isLoading: boolean = true;
  message: string = "Search a movie by name";
  results: any[] = [];
  page: number = 1;
  movieName: string = '';
  searchField: FormControl = new FormControl();

  constructor(
    private service: OmdbService,
    private router: Router
    ) { }

  ngOnInit() {
    this.searchField.valueChanges.pipe(
      debounceTime(1500), // Wait 1.5 second before search 
      switchMap(
        queryField => {
          this.page = 1;
          this.movieName = queryField; 
          this.isLoading = true;
          return this.service.search(queryField, this.page);
        }
      )
    ).subscribe(response => {
      if(response.Response== 'True') {
        this.results = response.Search;
        this.results.filter(el => {
          if(el.Poster == 'N/A' || el.Poster.substring(0, 5) == 'http:') {
            el.Poster = 'assets/no-av.png'
          } 
        });
        this.isLoading = false; 
      } else {
        this.results = [];
        this.message = "Can't find any movie with that name! Try again with valid name!"
        this.isLoading = false;
      }
    });
  }

  moviedetails(id: string) {
    this.router.navigate(['/movie', id]);
  }

  loadPage(value: number) {
    this.page = this.page + value;
    this.service.search(this.movieName, this.page).subscribe(response => {
      this.results = response.Search;
      this.results.filter(el => {
        if(el.Poster == 'N/A' || el.Poster.substring(0, 5) == 'http:') {
          el.Poster = 'assets/no-av.png'
        }
      });
      this.isLoading = false;
    });
  }
}

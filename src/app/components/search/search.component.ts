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
      this.results = response.Search;
      console.log(this.results);
      this.results.filter(el => {
        if(el.Poster == 'N/A') 
          el.Poster = 'assets/no-av.png'
      });
      this.isLoading = false;
    });
  }

  moviedetails(id: string) {
    this.router.navigate(['/movie', id]);
  }

  loadPage(value: number) {
    
    this.page = this.page + value;
    console.log(this.movieName, this.page);
    this.service.search(this.movieName, this.page).subscribe(response => {
      this.results = response.Search;
      console.log('stampa del res',response )
      this.results.filter(el => {
        if(el.Poster == 'N/A') 
          el.Poster = 'assets/no-av.png'
      });
      this.isLoading = false;
    });
  }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from 'src/app/providers/omdb.service';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  details: Movie;
  isLoading: boolean = true;
  constructor(private service: OmdbService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getMovieDetails(id).subscribe(
        value => {
          this.details = value;
          console.log(value);
          if(this.details.Poster == 'N/A') {
            this.details.Poster = 'assets/no-av.png'
          }
          this.isLoading = false;
        }
      );
    });
  }
}

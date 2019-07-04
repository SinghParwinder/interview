import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OmdbService } from 'src/app/providers/omdb.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {
  details: any;
  trailer: any;

  constructor(private service: OmdbService, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.service.getMovieDetails(id).subscribe(
        value => {
          this.details = value;
        }
      );
    });
  }
}

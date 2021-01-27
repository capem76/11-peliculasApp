import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/interfaces/movie-details-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { StarRatingComponent } from "ng-starrating";
import { Location } from '@angular/common';
import { Cast } from 'src/app/interfaces/credits-response';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movieDetails: MovieDetailsResponse;
  public cast: Cast[] = [];

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location,
               private router: Router ) { }

  ngOnInit(): void {
    // desestructuracion:
    // const { id } = this.activatedRoute.snapshot.params;
    const  idMovie  = this.activatedRoute.snapshot.params.id;  

    combineLatest([

      this.peliculasService.getPeliculasDetalle( idMovie ),
      this.peliculasService.getCast( idMovie )

    ]).subscribe( ( [ peliculaResponse, castResponse ] ) => {      
      if ( !peliculaResponse) {
            this.router.navigateByUrl('/home');
            return;
      }
      this.movieDetails = peliculaResponse;      
      this.cast = castResponse.filter( actor => actor.profile_path != null );
      
      
    } );

    
  }

  onRate($event:{oldValue:number, newValue:number, starRating:StarRatingComponent}) {
    alert(`Old Value:${$event.oldValue}, 
      New Value: ${$event.newValue}, 
      Checked Color: ${$event.starRating.checkedcolor}, 
      Unchecked Color: ${$event.starRating.uncheckedcolor}`);
  }

  onRegresar(){
    this.location.back();
  }

}

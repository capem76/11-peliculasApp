import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/interfaces/movie-details-response';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { StarRatingComponent } from "ng-starrating";
import { Location } from '@angular/common';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movieDetails: MovieDetailsResponse;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService,
               private location: Location ) { }

  ngOnInit(): void {
    // desestructuracion:
    // const { id } = this.activatedRoute.snapshot.params;
    const  idMovie  = this.activatedRoute.snapshot.params.id;
    console.log( idMovie );
    this.peliculasService.getPeliculasDetalle( idMovie ).subscribe( movieDetailsResponse => {
      // console.log( movieDetailsResponse );
      this.movieDetails = movieDetailsResponse;      

    });

    this.peliculasService.getCast( idMovie ).subscribe( cast => {
      console.log(cast);
      
    });
    
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

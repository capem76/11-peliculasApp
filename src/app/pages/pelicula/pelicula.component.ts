import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieDetailsResponse } from 'src/app/interfaces/movie-details-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css']
})
export class PeliculaComponent implements OnInit {

  public movieDetails: MovieDetailsResponse;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasService: PeliculasService ) { }

  ngOnInit(): void {
    // desestructuracion:
    // const { id } = this.activatedRoute.snapshot.params;
    const  idMovie  = this.activatedRoute.snapshot.params.id;
    console.log( idMovie );
    this.peliculasService.getPeliculasDetalle( idMovie ).subscribe( movieDetails => {
      console.log( movieDetails );
      

    });
    
  }

}

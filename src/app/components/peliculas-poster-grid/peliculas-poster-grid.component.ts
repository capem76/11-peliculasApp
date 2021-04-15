import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Router } from '@angular/router';
import { HomeSession } from 'src/app/interfaces/home-sesion';
import { ViewportScroller } from '@angular/common';
import { trimTrailingNulls } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-peliculas-poster-grid',
  templateUrl: './peliculas-poster-grid.component.html',
  styleUrls: ['./peliculas-poster-grid.component.css']
})
export class PeliculasPosterGridComponent implements OnInit, AfterViewInit, AfterViewChecked {

  @Input() public movies: Movie[] = [];  
  @Input() public movieGridParameters: HomeSession;
  public moviesPageActual: number;
  public jsonObject: any;
  

  constructor( private router: Router,
               private viewportScroller: ViewportScroller ) { 
    
  }

  ngAfterViewChecked(): void {
    
  }
  
  ngAfterViewInit(): void {
   
  }

  ngOnInit(): void {

    
    
  }


  onMovieClick( movie:Movie, indexId: number ){
    if(this.movieGridParameters){
      this.movieGridParameters.movieIndexClick = indexId;         
      // this.guardoDatosSessionStorage(this.movieGridParameters);
    }
    
    
    this.router.navigate( ['/pelicula', movie.id] );
    

  }

  guardoDatosLocalStorage( movieGridParameters: HomeSession  ){
    const homeParameters = JSON.stringify({
      homesession: movieGridParameters
     });
    
    localStorage.setItem('homeParameters', homeParameters);
    
  }

  guardoDatosSessionStorage( movieGridParameters: HomeSession  ){
    const homeParameters = JSON.stringify({
      homesession: movieGridParameters
     });
    
    sessionStorage.setItem('homeParameters', homeParameters);
    
  }

  getDatosSessionStorage( nombreValor: string ): any{
    
    return sessionStorage.getItem(nombreValor);

  }

  

}

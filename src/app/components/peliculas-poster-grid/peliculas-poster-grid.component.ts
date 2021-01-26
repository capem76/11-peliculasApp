import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class PeliculasPosterGridComponent implements OnInit, AfterViewInit {

  @Input() public movies: Movie[] = [];  
  @Input() public movieGridParameters: HomeSession;
  public moviesPageActual: number;
  public jsonObject: any;
  

  constructor( private router: Router,
               private viewportScroller: ViewportScroller ) { 
    
  }
  
  ngAfterViewInit(): void {
    // if ( this.getDatosSessionStorage('homeParameters') ) {
      
    //   console.log(this.movieGridParameters);
    //   this.jsonObject = JSON.parse( this.getDatosSessionStorage('homeParameters') );                  
    //   this.movieGridParameters = <HomeSession>this.jsonObject.homesession;
    //   console.log( this.movieGridParameters );
      
      
    //   console.log(`positionScrollCllick:${this.movieGridParameters.positionScrollClick}`);
    //   window.scrollTo(0,this.movieGridParameters.positionScrollClick);
      
      
      
    // }

    //  window.scrollTo(0,this.movieGridParameters.positionScroll);
    var anchorMovieId = this.getDatosSessionStorage('homeParameters') != null ? this.movieGridParameters.movieIndexClick : 0 ;   
    this.viewportScroller.scrollToAnchor( 'anchor_' + anchorMovieId);
    console.log(`After wiew init -- scroll to ${'anchor_' + anchorMovieId} `);

    
  }

  ngOnInit(): void {

    
    
    
  }


  onMovieClick( movie:Movie, indexId: number ){
    
    // console.log(`movie: ${movie} \n position scroll: ${document.documentElement.scrollTop}`);    
    this.movieGridParameters.movieIndexClick = indexId; 
    console.log(this.movieGridParameters);
    // this.guardoDatosLocalStorage(this.movieGridParameters);
    this.guardoDatosSessionStorage(this.movieGridParameters);
    

    
    
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

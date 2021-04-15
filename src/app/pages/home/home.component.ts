import { ViewportScroller } from '@angular/common';
import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { HomeSession } from 'src/app/interfaces/home-sesion';
import { PeliculasService } from 'src/app/services/peliculas.service';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit  {

  map = new Map();
  movies: Movie[] = [];
  MovieSlideshow: Movie[] = [];
  parametrosHome: HomeSession = {};
  isSessionHomeVacia: boolean = true;
  paginaInicial: number = 1;
  ultimaPaginaSolicitada: number = 0;
  public jsonObject: any;

  

  constructor( private peliculasService: PeliculasService,
               private viewportScroller: ViewportScroller,
               public translateService: TranslateService ) { }


  @HostListener( 'window:beforeunload', ['$event'] )
  unloadHandler( event: Event ){ 
    sessionStorage.clear();    
    
  }
  
  
  ngOnInit(): void {        
    this.obtenerDatosCartelera();

  }

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy(): void {
    this.peliculasService.resetCarteleraPage();
  }


  getDatosSessionStorage( nombreValor: string ): any{
    
    return sessionStorage.getItem(nombreValor);

  }

  guardoDatosSessionStorage( movieGridParameters: HomeSession  ){
    const homeParameters = JSON.stringify({
      homesession: movieGridParameters
     });
    
    sessionStorage.setItem('homeParameters', homeParameters);
    
  }


 onClickPeliculaVisitada( idPelicula: number ){
    this.viewportScroller.scrollToAnchor( 'anchor_' + idPelicula);
 }

 obtenerDatosCartelera(){
      this.peliculasService.getCartelera( this.paginaInicial)
        .subscribe( resp =>{        
          this.movies = resp.results;
          this.MovieSlideshow = resp.results;
          this.parametrosHome.movies =  resp.results;
          this.parametrosHome.ultimaPagina = resp.page;          
        });
  
    
 }



  

 

}

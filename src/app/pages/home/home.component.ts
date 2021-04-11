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
  
  
  @HostListener( 'window:scroll', ['$event'] )
  onScroll( ){    
    const positionScroll = (document.documentElement.scrollTop || document.body.scrollTop) ;
    const positionMaxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight)  ;    
    let endScroll: boolean = false;      
    endScroll = (positionMaxScroll-positionScroll) <= (document.documentElement.clientHeight + 150) ? true : false;    

    if (endScroll) {     
      //llamar servicio
      console.log('fin scroll');
      
      this.peliculasService.getCartelera( this.parametrosHome.ultimaPagina+1).subscribe( (resp) => {
        this.movies.push(...resp.results);        
        this.parametrosHome = {
          movies : this.movies,          
          ultimaPagina : resp.page
          
        };
        console.log(`resp.page: ${resp.page}`);
        
        this.guardoDatosSessionStorage(this.parametrosHome);

      } )
    
    }
 
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
    this.isSessionHomeVacia = sessionStorage.getItem('homeParameters') != null ? false : true;
    // si tengo los datos en la session entonces no llamo al servicio inicial y pinto los valores de la  session
    if(this.isSessionHomeVacia) {
      this.peliculasService.getCartelera( this.paginaInicial)
        .subscribe( resp =>{        
          this.movies = resp.results;
          this.MovieSlideshow = resp.results;
          this.parametrosHome.movies =  resp.results;
          this.parametrosHome.ultimaPagina = resp.page;
          
        });
  
    }else{            
      this.jsonObject = JSON.parse( this.getDatosSessionStorage('homeParameters') );                  
      this.parametrosHome = <HomeSession>this.jsonObject.homesession;    
      this.movies = this.parametrosHome.movies;      
    }

 }



  

 

}


import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CarteleraResponse, Movie } from 'src/app/interfaces/cartelera-response';
import { HelperService } from 'src/app/services/helper.service';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public textoBuscar: string = "";
  public movies: Movie[] = [];
  public totalMovies: number = 0;
  public totalPage: number = 0;
  public actualPage: number = 1;
  public paginaSiguiente: number = 2;
  public carteleraResponse: CarteleraResponse;
  public isFinDePaginas: boolean = false;
  private paginaInicial: number = 1;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasServices: PeliculasService,
               private helperService: HelperService,
               private translate: TranslateService) { }

  ngOnInit(): void {
    
    this.activatedRoute.params.subscribe( params => {    
      this.textoBuscar = params.texto;
      this.inicializarVariablesGlobales();
      


      this.peliculasServices.buscarPeliculas( params.texto, this.paginaInicial ).subscribe( carteleraResponse => {
        console.log(carteleraResponse);
        this.movies = carteleraResponse.results;                
        this.carteleraResponse = carteleraResponse;
        this.totalPage = carteleraResponse.total_pages;        
        
        

      })
    });
    
    
  }

  @HostListener( 'window:scroll', ['$event'] )
  onScroll(){
     const positionScroll = (document.documentElement.scrollTop || document.body.scrollTop) ;
     const positionMaxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) ;
     let endScroll: boolean = false;  
     let DOMRect = document.documentElement.getBoundingClientRect();
     const bottomMax: number = Number(DOMRect.bottom.toFixed());
          
     
     endScroll = (positionMaxScroll-positionScroll) === document.documentElement.clientHeight ? true : false;    
   
     if (endScroll && !this.isFinDePaginas) {       
       console.log('fin scroll');
       //llamar servicio solo si aun faltan paginas por mostrar       
       this.actualPage++;
       console.log(`busco pagina: ${this.paginaSiguiente}` );       
       this.peliculasServices.buscarPeliculas(this.textoBuscar, this.paginaSiguiente).subscribe( (resp) => {
         this.movies.push(...resp.results);
         this.actualPage = resp.page; 
         this.paginaSiguiente = this.actualPage + 1;        
         this.isFinDePaginas = this.actualPage >= this.totalPage ? true : false;         
         console.log(`pagina total: ${this.totalPage} \n pagina actual: ${this.actualPage} \n fin paginas: ${this.isFinDePaginas}`);  
  
       } )       
       
     
     }


  }

  inicializarVariablesGlobales(){
    this.paginaInicial = 1;
    this.actualPage = 1;
    this.paginaSiguiente = 2;
    this.isFinDePaginas = false;


  }

  translateContenido( ): void {    
    this.translate.get('navbar').subscribe( ( navbarValores: string) => {              
      // this.inputBuscar =   navbarValores['input.buscar'];       
       
     });

  } 

  

 

}

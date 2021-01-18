
import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public carteleraResponse: CarteleraResponse;
  public isFinDePaginas: boolean = false;

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasServices: PeliculasService,
               private helperService: HelperService) { }

  ngOnInit(): void {
    // this.textoBuscar = this.activatedRoute.snapshot.params['texto'];
    
    
    this.activatedRoute.params.subscribe( params => {    
      this.peliculasServices.buscarPeliculas( params.texto, this.actualPage ).subscribe( carteleraResponse => {
        console.log(carteleraResponse);
        this.textoBuscar = params.texto;
        this.movies = carteleraResponse.results;                
        this.carteleraResponse = carteleraResponse;

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
     // console.log(endScroll);
   
     if (endScroll && !this.isFinDePaginas) {       
       console.log('fin scroll');
       //llamar servicio solo si aun faltan paginas por mostrar       
       this.peliculasServices.buscarPeliculas(this.textoBuscar, this.actualPage).subscribe( (resp) => {
         this.movies.push(...resp.results);
         this.actualPage = resp.page;
         this.totalPage = resp.total_pages;     
         this.actualPage++;
         this.isFinDePaginas = this.totalPage === this.actualPage? true : false;
         console.log(`pagina total: ${this.totalPage} \n pagina actual: ${this.actualPage} \n fin paginas: ${this.isFinDePaginas}`);

  
  
       } )
       
       
     
     }
  }

  

 

}

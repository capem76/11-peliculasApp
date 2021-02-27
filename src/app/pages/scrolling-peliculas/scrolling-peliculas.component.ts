import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { CarteleraResponse } from 'src/app/interfaces/cartelera-response';
import { Movie } from '../../interfaces/cartelera-response';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-scrolling-peliculas',
  templateUrl: './scrolling-peliculas.component.html',
  styleUrls: ['./scrolling-peliculas.component.css']
})
export class ScrollingPeliculasComponent implements OnInit, AfterViewInit {

  paginaInicio: number = 1;
  movies:Movie[] =[];
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;

  batch: number = 4;
  isThenEnd: boolean = false;

  constructor( private peliculasService: PeliculasService ) { }

  
  ngOnInit(): void {
    
    this.peliculasService.getCartelera( this.paginaInicio )
        .subscribe(  carteleraResp =>{
            this.movies = carteleraResp.results;
            
          },
          error => {                        
            console.error(error);
            
          }, () =>{
            console.log( 'llamada con exito a cartelera');
            
            
          }
        );
  }
  
  ngAfterViewInit(): void {
    
  }


}

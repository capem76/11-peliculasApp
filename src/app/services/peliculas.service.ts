import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { map, tap } from "rxjs/operators";
import { MovieDetailsResponse } from '../interfaces/movie-details-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number;  
  private moviesPage: number = 1;

  constructor( private http: HttpClient  ) {
    this.carteleraPage = 1;
   }

  
  get params() {
    return  {
      api_key: 'e97743a8e47b50c18195f4f928c36480',
      language: 'es-ES',
      page: this.carteleraPage.toString()
    }
  }

  getCartelera():Observable<CarteleraResponse>{
    // console.log(this.carteleraPage);    
    // let observableCartelera: Observable<CarteleraResponse> = this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
    //   params: this.params
    // });
    // this.carteleraPage++;
    
    // return observableCartelera;
    
    
    console.log("cargando pagina: " + this.carteleraPage);
    return this.http.get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`,{
        params: this.params
      }).pipe(
          tap( () => {                    
            this.carteleraPage++;
             
          })
      );
    }

   buscarPeliculas( textoBuscar: string, pageSolicitada: number ): Observable<CarteleraResponse> {
     
     const params = { ...this.params, page: pageSolicitada.toString(), query: textoBuscar };
     
     
      // https://api.themoviedb.org/3/search/movie?api_key=e97743a8e47b50c18195f4f928c36480&language=es-ES&query=sirenita&page=1&include_adult=false
      return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
        params: params
      }).pipe(
        map( resp => resp )        
      )


   }


  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getPeliculasDetalle( idMovie: string ){
    // https://api.themoviedb.org/3/movie/508442?api_key=e97743a8e47b50c18195f4f928c36480&language=es-ES
    return this.http.get<MovieDetailsResponse>(`${ this.baseUrl }/movie/${ idMovie }`,{
      params: this.params
    });

  }

}

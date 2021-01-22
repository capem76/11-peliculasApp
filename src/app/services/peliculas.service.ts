import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { catchError, map, tap } from "rxjs/operators";
import { MovieDetailsResponse } from '../interfaces/movie-details-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage: number;  
  private moviesPage: number = 1;
  private moviesBuffer:Movie[] = [];

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
     
     
      
      return this.http.get<CarteleraResponse>(`${this.baseUrl}/search/movie`,{
        params: params
      }).pipe(
        map( resp => resp)        
      )


   }


  resetCarteleraPage(){
    this.carteleraPage = 1;
  }

  getPeliculasDetalle( idMovie: string ) {    

    return this.http.get<MovieDetailsResponse>(`${ this.baseUrl }/movie/${ idMovie }`,{
      params: this.params
    }).pipe(
      catchError( err => of( null ) )
    )

  }

  getCast( idMovie: string ): Observable<Cast[]>{
    https://api.themoviedb.org/3/movie/464052/credits?api_key=e97743a8e47b50c18195f4f928c36480&language=es-ES&movie_id=464052
    return this.http.get<CreditsResponse>(`${ this.baseUrl }/movie/${ idMovie }/credits`,{
      params: this.params
    }).pipe(
      map( resp => resp.cast ),
      catchError( err => of( [] ) )
    );

  }

}

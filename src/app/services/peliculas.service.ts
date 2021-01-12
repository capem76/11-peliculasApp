import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;  

  constructor( private http: HttpClient  ) { }

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
}

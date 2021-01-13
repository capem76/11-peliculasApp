import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css']
})
export class BuscarComponent implements OnInit {

  public textoBuscar: string = "";

  constructor( private activatedRoute: ActivatedRoute,
               private peliculasServices: PeliculasService ) { }

  ngOnInit(): void {
    this.textoBuscar = this.activatedRoute.snapshot.params['texto'];
    // console.log(this.textoBuscar);
    
    this.activatedRoute.params.subscribe( params => {
      // console.log(params.texto);
      this.peliculasServices.buscarPeliculas( params.texto ).subscribe( movies => {
        console.log(movies);        
      })
    } );
    

  }

}

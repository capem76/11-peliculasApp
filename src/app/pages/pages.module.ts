import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';
import { RatingModule } from 'ng-starrating';
import { ScrollingPeliculasComponent } from './scrolling-peliculas/scrolling-peliculas.component';
//scrolling
import { ScrollingModule } from "@angular/cdk/scrolling";
//Material
import { MaterialModule } from "../material/material.module";
import { MaterialExampleComponent } from './material-example/material-example.component';
//Shared
import { SharedModuleModule } from '../shared-module/shared-module.module';







@NgModule({
  declarations: [HomeComponent, PeliculaComponent, BuscarComponent, ScrollingPeliculasComponent, MaterialExampleComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule,
    RatingModule,
    ScrollingModule,
    MaterialModule,
    SharedModuleModule

    
  ]
})
export class PagesModule { }

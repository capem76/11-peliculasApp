import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from "ng-starrating";
import { PipesModule } from '../pipes/pipes.module';
import { CastSlideShowComponent } from './cast-slide-show/cast-slide-show.component';
// scrolling
import { ScrollingModule } from "@angular/cdk/scrolling";
import { PeliculasGrid2Component } from './peliculas-grid2/peliculas-grid2.component';
import { PeliculaCardComponent } from './pelicula-card/pelicula-card.component';
import {MatCardModule} from '@angular/material/card';
//shared
import { SharedModuleModule } from '../shared-module/shared-module.module';








@NgModule({
  declarations: [NavbarComponent, SlideshowComponent, PeliculasPosterGridComponent, CastSlideShowComponent, PeliculasGrid2Component, PeliculaCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    RatingModule,
    PipesModule,
    ScrollingModule,
    MatCardModule,
    SharedModuleModule
    


  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    CastSlideShowComponent,
    PeliculasGrid2Component,
    PeliculaCardComponent
  ]
})
export class ComponentsModule { }

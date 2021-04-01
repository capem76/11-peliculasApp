import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { HomeComponent } from './pages/home/home.component';
import { MaterialExampleComponent } from './pages/material-example/material-example.component';
import { PeliculaComponent } from './pages/pelicula/pelicula.component';
import { ScrollingPeliculasComponent } from './pages/scrolling-peliculas/scrolling-peliculas.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'pelicula/:id', component: PeliculaComponent },
  { path: 'buscar/:texto' , component: BuscarComponent },
  { path: 'home2' , component: ScrollingPeliculasComponent },
  { path: 'material' , component: MaterialExampleComponent },
  { path: 'welcome' , component: WelcomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }

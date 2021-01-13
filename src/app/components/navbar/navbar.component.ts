import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  buscarPelicula( textoBuscar: string ){
    textoBuscar = textoBuscar.trim();
    if (textoBuscar.length === 0) {
      return;
      
    }
    console.log(textoBuscar);
    // this.router.navigate([`buscar/${textoBuscar}`]);
    this.router.navigate(['/buscar', textoBuscar]);

    


  }

}

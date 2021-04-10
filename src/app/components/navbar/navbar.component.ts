import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inputBuscar: string = "navbar.input.buscar";

  constructor( 
          private router: Router,
          private translate: TranslateService
  ) { }
  

  ngOnInit(): void {
    
    
  }



  buscarPelicula( textoBuscar: string ){
    textoBuscar = textoBuscar.trim();
    if (textoBuscar.length === 0) {
      return;
      
    }    
    this.router.navigate(['/buscar', textoBuscar]);

  }


  

}

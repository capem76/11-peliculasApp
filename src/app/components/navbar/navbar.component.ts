import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from "@ngx-translate/core";
import { LangTranslate, Navbar } from '../../interfaces/lang/Lang-translate';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  inputBuscar: string = "";

  constructor( 
          private router: Router,
          private translate: TranslateService
  ) { }

  ngOnInit(): void {
    
    this.translateContenido();
    
  }

  buscarPelicula( textoBuscar: string ){
    textoBuscar = textoBuscar.trim();
    if (textoBuscar.length === 0) {
      return;
      
    }    
    this.router.navigate(['/buscar', textoBuscar]);

  }

  translateContenido( ): void {    
    this.translate.get('navbar').subscribe( ( navbarValores: string) => {              
      this.inputBuscar =   navbarValores['input.buscar'];       
       
     }); 
    

  }

  

}

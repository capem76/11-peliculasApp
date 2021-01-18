import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public map = new Map();
  public movies: Movie[] = [];
  public MovieSlideshow: Movie[] = [];
  
  

  constructor( private peliculasService: PeliculasService ) { 
  }

  @HostListener( 'window:scroll', ['$event'] )
   onScroll(){
    const positionScroll = (document.documentElement.scrollTop || document.body.scrollTop) ;
    const positionMaxScroll = (document.documentElement.scrollHeight || document.body.scrollHeight) ;
    let endScroll: boolean = false;  
    let DOMRect = document.documentElement.getBoundingClientRect();
    const bottomMax: number = Number(DOMRect.bottom.toFixed());
    
    endScroll = (positionMaxScroll-positionScroll) === document.documentElement.clientHeight ? true : false;
    // console.log(endScroll);
  
    if (endScroll) {
      console.log('fin scroll');
      //llamar servicio
      this.peliculasService.getCartelera().subscribe( (resp) => {
        this.movies.push(...resp.results);


      } )
    
    }

    if(DOMRect.top === 0)
    console.log("start Scroll");
    
    
  }

  ngOnInit(): void {

    this.peliculasService.getCartelera()
      .subscribe( resp =>{        
        this.movies = resp.results;
        this.MovieSlideshow = resp.results;
        
        
      });


  }

}

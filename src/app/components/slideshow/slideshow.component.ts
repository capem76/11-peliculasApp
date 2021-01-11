import { AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { Swiper } from 'swiper';


@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit, AfterViewInit {

  @Input()public movies: Movie[] = [];
  public backgroundImage: string;
  public mySwiper: Swiper;

  constructor() { }

  ngAfterViewInit(): void {

    this.mySwiper = new Swiper('.swiper-container', {
      // Optional parameters      
      loop: true,
    
    })
  
  }

  ngOnInit(): void {

    console.log( this.movies);
    // this.movies[0].title
    
    
    
  }

  onSlideNext(){
    this.mySwiper.slideNext( 1200, false );
  }

  onSlidePrev(){
    this.mySwiper.slidePrev( 1200, false );
  }

}

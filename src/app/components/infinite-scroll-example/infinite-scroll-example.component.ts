import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { HomeSession } from 'src/app/interfaces/home-sesion';
import { PeliculasService } from "../../services/peliculas.service";

@Component({
  selector: 'app-infinite-scroll-example',
  templateUrl: './infinite-scroll-example.component.html',
  styleUrls: ['./infinite-scroll-example.component.css']
})
export class InfiniteScrollExampleComponent implements OnInit, OnDestroy {

  
  private _finishPage = 10;  
  private _actualPage: number;  
  private _showGoUpButton: boolean;
  private showScrollHeight = 400;
  private hideScrollHeight = 200;
  private _arrayMoviesInicial: Movie[] = [];  
  private _arrayMovies: Movie[]=[];
  private _parametrosHome: HomeSession;  
  private _paginaIncial: number;
  private _arrayMoviesAux: Movie[] = [];
  private totalPages: number;
  private page: number;
  private notScrolly: boolean = true;
  private _isNotEmptyMovies: boolean = true;  
  private timeout: any;
  
  

  constructor( private peliculaService: PeliculasService, private spinner: NgxSpinnerService ) { 
    this.actualPage = 1;
    this.paginaIncial = 1;
    this._showGoUpButton = false;
  }
  
  
  ngOnInit() {  
    this.addMoviesInicial();
  }

  ngOnDestroy(): void {    
    clearTimeout(this.timeout);

    
  }

  guardarArrayEnSession( array:Movie[] ){
    if( this.arrayMovies.length >= 60 ){
      console.log(`movies[${this.arrayMovies.length}]>60 peliculas... corto`);
      
      var arrayAux = this.arrayMovies.slice(0,39);
      this.arrayMovies = this.arrayMovies.slice(40);
      sessionStorage.setItem('arrayAux', JSON.stringify(arrayAux) );
    }
    
  }

  addMoviesInicial(){
    this.peliculaService.getCartelera( 1 ).subscribe( resp => { 
      this.arrayMovies.push(...resp.results);     
    });
  }

  
  addMovies(){    
    this.peliculaService.getCartelera( this.actualPage ).subscribe( resp => {                    
      const newMovies:Movie[] = resp.results;      
      this.spinner.hide();      
      if( newMovies.length === 0 ){
        this.isNotEmptyMovies = false;
      }      
      this.arrayMovies.push(...resp.results);        
      this.notScrolly = true;  
    });
  }

  onScroll() {
     if (this.notScrolly && this.isNotEmptyMovies) {                      
        this.spinner.show();
        this.notScrolly = false;
         this.actualPage ++;
         this.timeout = setTimeout( ()=>{
           this.addMovies();    
        }, 1000 );
         
     }
  }

  onScrollUp(){
    console.log("scrolling up"); 
    if( this.actualPage > this.paginaIncial  ) {      
      console.log(`pagina actual: ${this.actualPage}`);
      
    }
  }

  scrollTop() {
    console.log("deberia subir!");
    
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
// @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', []) //for window scroll events
    onWindowScroll() {
      if (( window.pageYOffset ||
             document.documentElement.scrollTop || 
              document.body.scrollTop) > this.showScrollHeight) {
        this.showGoUpButton = true;

      } else if ( this.showGoUpButton && 
          (window.pageYOffset ||
               document.documentElement.scrollTop ||
               document.body.scrollTop) 
          < this.hideScrollHeight) {
        this.showGoUpButton = false;
      }
    }

  // getters & setters

  public get parametrosHome(): HomeSession {
    return this._parametrosHome;
  }
  public set parametrosHome(value: HomeSession) {
    this._parametrosHome = value;
  }

  public get finishPage() {
    return this._finishPage;
  }

  public set finishPage(value) {
    this._finishPage = value;
  }

  public get actualPage(): number {
    return this._actualPage;
  }
   public set actualPage(value: number) {
    this._actualPage = value;
  }

  public get arrayMovies(): Movie[] {
    return this._arrayMovies;
  }

  public set arrayMovies(value: Movie[]) {
    this._arrayMovies = value;
  }
  
  public get showGoUpButton(): boolean {
    return this._showGoUpButton;
  }
  public set showGoUpButton(value: boolean) {
    this._showGoUpButton = value;
  }

  public get paginaIncial(): number {
    return this._paginaIncial;
  }
  public set paginaIncial(value: number) {
    this._paginaIncial = value;
  }

  public get arrayMoviesInicial(): Movie[] {
    return this._arrayMoviesInicial;
  }
  public set arrayMoviesInicial(value: Movie[]) {
    this._arrayMoviesInicial = value;
  }

  public get arrayMoviesAux(): Movie[] {
    return this._arrayMoviesAux;
  }
  public set arrayMoviesAux(value: Movie[]) {
    this._arrayMoviesAux = value;
  }

  public get isNotEmptyMovies(): boolean {
    return this._isNotEmptyMovies;
  }
  public set isNotEmptyMovies(value: boolean) {
    this._isNotEmptyMovies = value;
  }

 
  
}

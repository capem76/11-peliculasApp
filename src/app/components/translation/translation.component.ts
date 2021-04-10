import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LangTranslate } from '../../interfaces/lang/Lang-translate';

@Component({
  selector: 'app-translation',
  templateUrl: './translation.component.html',
  styleUrls: ['./translation.component.css']
})
export class TranslationComponent implements OnInit {
  
  private languageObj: LangTranslate;

  constructor( private translate: TranslateService ) { 
    this.setTranslateParameters();
  }

  public set _languageObj( languageObj: LangTranslate ){
    this.languageObj = languageObj;
  }

  public get _languageObj():LangTranslate{
    return this.languageObj;
  }

  ngOnInit(): void {
  }

  public cambiarLenguaje( lang: string ){ 
    var nuevoLanguageObj: LangTranslate = {
      languajeTranslate: lang,
      languajeReqIdbMovie: `${lang}-${lang.toLocaleUpperCase()}`
    }    
        
    this.guardaVariablesStorage( nuevoLanguageObj );
    window.location.reload();
    
  }

  guardaVariablesStorage( languageObj: LangTranslate ){    
    var jsonLanguageObj = JSON.stringify( languageObj );
    localStorage.setItem('localeLang', jsonLanguageObj);

  }

  setTranslateParameters(){  
    if(localStorage.getItem('localeLang')){
      var jsonLangTranslate: LangTranslate = JSON.parse( localStorage.getItem('localeLang')  );
      this.translate.setDefaultLang( jsonLangTranslate.languajeTranslate );
      this.translate.use( jsonLangTranslate.languajeTranslate );
      this.languageObj = jsonLangTranslate;
    }
    else{
      this.translate.setDefaultLang( 'es' );
      this.translate.use('es');
      this.languageObj = {
        languajeTranslate: 'es'
      }      

    }
    
  }

}

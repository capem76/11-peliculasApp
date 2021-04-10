import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'peliculasApp';
  public activeLang = "es";

  constructor( public translate: TranslateService  ){
    this.translate.addLangs(['es', 'en', 'fr']);
    this.translate.setDefaultLang(this.activeLang);
    // this.translate.use('fr');
  }

  useLanguage( language: string ): void{
    this.activeLang = language;
    this.translate.use(language);
  }

}

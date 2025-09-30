import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

  language = localStorage.getItem('lang');

  constructor(public translate: TranslateService, private langService: LanguageService) {
  }

  ngAfterViewInit() {
    const INIT_LANG = this.langService.initLang();
    console.log("init", this.language, INIT_LANG);
    if(this.language){
      this.translate.use(this.language);
    } else {
      this.translate.use(INIT_LANG);
    }
     
  }

  setLang(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
    localStorage.setItem('lang', lang);
  }
}

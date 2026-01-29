import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  standalone: false
})
export class LanguageSelectorComponent {

  language = localStorage.getItem('lang');

  constructor(public translate: TranslateService, private langService: LanguageService) {
  }

  ngAfterViewInit() {
    this.language = this.langService.initLang();
    this.translate.use(this.language);
  }

  setLang(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
    this.langService.setLanguage(lang);
  }
}

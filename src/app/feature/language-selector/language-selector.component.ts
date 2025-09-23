import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss'
})
export class LanguageSelectorComponent {

	language = localStorage.getItem('lang');

  constructor(public translate: TranslateService) {
  }

  setLang(lang: string): void {
		this.language = lang;
		this.translate.use(lang);
		localStorage.setItem('lang', lang);
	}
}

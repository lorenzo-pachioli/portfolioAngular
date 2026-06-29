import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.scss',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageSelectorComponent {

  language = localStorage.getItem('lang');

  constructor(public translate: TranslateService, private langService: LanguageService, private cdr: ChangeDetectorRef) {
  }

  ngAfterViewInit() {
    this.language = this.langService.initLang();
    this.translate.use(this.language);
    this.cdr.markForCheck();
  }

  setLang(lang: string): void {
    this.language = lang;
    this.translate.use(lang);
    this.langService.setLanguage(lang);
    this.cdr.markForCheck();
  }
}

import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LanguageService {

	constructor() { }

	private setDefaultLang(): string {
		const ln = navigator.language && navigator.language.slice(0, 2);
		if (ln === 'es') {
			return 'es-AR';
		} else {
			return 'en-US';
		}
	}

	initLang(): string {
		const lang = localStorage.getItem('lang');
		const DEFAULT_LANG = this.setDefaultLang();
		if (lang) {
			if (lang === 'en-us') {
				localStorage.setItem('lang', 'en-US');
				return 'en-US';
			}
			if (lang === 'es-ar') {
				localStorage.setItem('lang', 'es-AR');
				return 'es-AR';
			}
			return lang;
		} else {
			localStorage.setItem('lang', DEFAULT_LANG);
			return DEFAULT_LANG;
		}
	}

	setLanguage(newLang: string) {
		localStorage.setItem('lang', newLang);
	}
}

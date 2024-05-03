import { Component, OnInit } from '@angular/core';
import { history, buttonsHistory } from './aboutData';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  info = 'today';
  list = history;
  buttonsList = buttonsHistory;
  constructor() { }

  ngOnInit(): void {
  }

  setInfo(currentInfo: string): void {
    this.info = currentInfo;
  }

  setButtonColor(value: string): any {
    if (this.info === value) {
      return { 'text-shadow': '0 0 0.10em var(--color2), 0 0 0.5em var(--color5)' }
    }
    return { 'color': 'var(--color3)' }
  }
}

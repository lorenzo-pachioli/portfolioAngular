import { Component, OnInit } from '@angular/core';
import { history } from './aboutData';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {

  info = 'today';
  list = history;
  constructor() { }

  ngOnInit(): void {
  }

  setInfo(currentInfo: string): void {
    this.info = currentInfo;
  }

  setButtonColor(value: string): any {
    if (this.info === value) {
      return { 'background-color': 'var(--color3)' }
    }
    return { 'background-color': 'var(--color5)' }
  }
}

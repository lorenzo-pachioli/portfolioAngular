import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss']
})
export class DesktopMenuComponent implements OnInit {

  visible = {
    home: false,
    skills: false,
    portfolio: false,
    about: false,
    contact: false
  }

  constructor(public element: ElementByIdService) {
    this.element.visible.subscribe(currentVisible => {
      this.visible = currentVisible;
    })
  }

  ngOnInit(): void {
  }

  scroll(el: any) {

    if (el === 'home') {
      setTimeout(() => {
        this.element.home.nativeElement.scrollIntoView({ behavior: "smooth" });
      }, 1);
    }
    if (el === 'skills') {
      setTimeout(() => {
        this.element.skills.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1);
    }
    if (el === 'portfolio') {
      setTimeout(() => {
        this.element.portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
      }, 1);
    }
    if (el === 'about') {
      setTimeout(() => {
        this.element.about.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1);
    }
    if (el === 'contact') {
      setTimeout(() => {
        this.element.contact.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 1);
    }
  }

  border(visible: boolean) {
    return {
      'border-bottom': visible ? '2px solid var(--color5)' : '',
      'box-shadow': visible ? 'inset 0 0 0.3em 0 var(--color5), inset 0 0 0.1em var(--color2), 0 0 0.3em 0 var(--color5),0 0 0.1em var(--color2)' : '',
      'clip-path': 'inset(0.5em 0.5em 0px 0.5em)'
    };
  }

}

import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  visible = {
    home: false,
    skills: false,
    portfolio: false,
    about: false,
    contact: false
  }
  linkCv = environment.cv_link;

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
}

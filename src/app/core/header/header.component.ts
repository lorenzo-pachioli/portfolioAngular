import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public element: ElementByIdService) {

  }

  ngOnInit(): void {
  }

  scroll(el: any) {

    if (el === 'home') {
      this.element.home.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'skills') {
      this.element.skills.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (el === 'portfolio') {
      const portfolio = this.element.portfolio;
      portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'about') {
      this.element.about.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
    if (el === 'contact') {
      this.element.contact.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
  }

}

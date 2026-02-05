import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
  standalone: false
})
export class MobileMenuComponent implements OnInit {

  visible = {
    home: false,
    skills: false,
    portfolio: false,
    about: false,
    contact: false
  };

  constructor(public element: ElementByIdService) {
    this.element.visible.subscribe(currentVisible => {
      this.visible = currentVisible;
    });
  }

  ngOnInit(): void {
  }

  scroll(el: string) {
    this.element.requestScroll(el);
  }
}

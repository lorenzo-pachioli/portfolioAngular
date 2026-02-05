import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';

@Component({
  selector: 'app-desktop-menu',
  templateUrl: './desktop-menu.component.html',
  styleUrls: ['./desktop-menu.component.scss'],
  standalone: false
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

  scroll(el: string) {
    this.element.requestScroll(el);
  }

  border(visible: boolean) {
    return {
      'border-bottom': visible ? '2px solid var(--color5)' : '',
      'box-shadow': visible ? 'inset 0 0 0.3em 0 var(--color5), inset 0 0 0.1em var(--color2), 0 0 0.3em 0 var(--color5),0 0 0.1em var(--color2)' : '',
      'clip-path': 'inset(0.5em 0.5em 0px 0.5em)'
    };
  }

}

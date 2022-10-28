import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
  }

  scroll(el: any) {

    if (el === 'skills') {
      this.element.skills.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (el === 'contact') {
      this.element.contact.nativeElement.scrollIntoView({ behavior: "smooth" });
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { cloudinary } from 'src/assets/img-cloudinary/img-cloudinary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  perfil = cloudinary.perfil;

  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
  }

  scroll(el: any) {

    if (el === 'skills') {
      this.element.skills.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    if (el === 'contact') {
      this.element.contact.nativeElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }
}

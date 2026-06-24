import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { cloudinary } from 'src/assets/img-cloudinary/img-cloudinary';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  perfil = cloudinary.perfil;

  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
  }

  scroll(el: any) {
    this.element.requestScroll(el, 'top top', 1.5); // Terminar de revisar velocidad de scroll
  }
}

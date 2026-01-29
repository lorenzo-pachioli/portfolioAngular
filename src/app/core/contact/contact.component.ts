import { Component, OnInit } from '@angular/core';
import { cloudinarySvg } from 'src/assets/svg-cloudinary/svg-cloudinary';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  standalone: false
})
export class ContactComponent implements OnInit {

  linkCv = environment.cv_link;
  svgLinkedin = cloudinarySvg.linkedin;
  github = cloudinarySvg.github;
  constructor() { }

  ngOnInit(): void {
  }

}

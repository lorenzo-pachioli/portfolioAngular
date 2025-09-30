import { Component, OnInit } from '@angular/core';
import { cloudinarySvg } from 'src/assets/svg-cloudinary/svg-cloudinary';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-social-side-nav',
  templateUrl: './social-side-nav.component.html',
  styleUrls: ['./social-side-nav.component.scss']
})
export class SocialSideNavComponent implements OnInit {

  menuOpen = false;
  linkCv = environment.cv_link;
  svgLinkedin = cloudinarySvg.linkedin;
  github = cloudinarySvg.github;

  constructor() { }

  ngOnInit(): void {
  }

  changeMenuState(): void {
    this.menuOpen = !this.menuOpen;
  }

}

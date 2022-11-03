import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-side-nav',
  templateUrl: './social-side-nav.component.html',
  styleUrls: ['./social-side-nav.component.scss']
})
export class SocialSideNavComponent implements OnInit {

  menuOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

  changeMenuState(): void {
    this.menuOpen = !this.menuOpen;
  }

}

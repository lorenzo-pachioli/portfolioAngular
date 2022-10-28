import { ElementRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElementByIdService {


  home!: ElementRef;
  skills!: ElementRef;
  portfolio!: ElementRef;
  about!: ElementRef;
  contact!: ElementRef;

  constructor() { }

  setHome(element: ElementRef): void {
    this.home = element;
  }

  setSkills(element: ElementRef): void {
    this.skills = element;
  }

  setPortfolio(element: ElementRef): void {
    this.portfolio = element;
  }

  setAbout(element: ElementRef): void {
    this.about = element;
  }

  setContact(element: ElementRef): void {
    this.contact = element;
  }

}

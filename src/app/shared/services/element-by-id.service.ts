import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
interface IVisible {
  home?: boolean,
  skills?: boolean,
  portfolio?: boolean,
  about?: boolean,
  contact?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class ElementByIdService {

  visible: BehaviorSubject<any> = new BehaviorSubject({
    home: false,
    skills: false,
    portfolio: false,
    about: false,
    contact: false
  });

  private scrollRequest = new BehaviorSubject<string | null>(null);
  scrollRequest$ = this.scrollRequest.asObservable();

  requestScroll(section: string) {
    this.scrollRequest.next(section);
  }
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

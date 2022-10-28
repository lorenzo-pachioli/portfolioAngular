import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../shared/interfaces/IProject';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  setProject(event: IProject): void {
    console.log(event);
    this.project = event;
  }

}

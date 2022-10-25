import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IProject } from '../../shared/interfaces/IProject';
import { projectsList } from './projectsList';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss']
})
export class PortfolioGridComponent implements OnInit {

  projectsList = projectsList;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  chooseProject(project: IProject): void {
    this.projectChange.emit(project);
  }

}

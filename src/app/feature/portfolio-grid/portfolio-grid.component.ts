import { Component, EventEmitter, HostListener, OnInit, Output, Input } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { IProject } from '../../shared/interfaces/IProject';
import { projectsList } from './projectsList';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss'],
  standalone: false
})
export class PortfolioGridComponent implements OnInit {

  innerWidth: any;
  gridSize = {
    col: 4,
    rowHeight: '300px',
    gutterSize: '20px'
  }
  projectsList = projectsList;
  @Input() showProject = false;
  @Output() showProjectChange: EventEmitter<boolean> = new EventEmitter();
  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();
  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mobileGrid(this.innerWidth);
  }
  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.mobileGrid(this.innerWidth);
  }

  chooseProject(project: IProject): void {
    this.showProjectChange.emit(true);
    this.projectChange.emit(project);
    setTimeout(() => {
      this.element.portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
    }, 1);
  }

  mobileGrid(width: number) {
    if (width <= 500) {
      this.gridSize = {
        col: 2,
        rowHeight: '200px',
        gutterSize: '10px'
      }
    } else if (width <= 700) {
      this.gridSize = {
        col: 2,
        rowHeight: '300px',
        gutterSize: '10px'
      }
    } else if (width <= 1000) {
      this.gridSize = {
        col: 2,
        rowHeight: '200px',
        gutterSize: '20px'
      }
    } else {
      this.gridSize = {
        col: 4,
        rowHeight: '300px',
        gutterSize: '20px'
      }
    }
  }
}

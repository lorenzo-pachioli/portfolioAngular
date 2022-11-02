import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { IProject } from '../../shared/interfaces/IProject';
import { projectsList } from './projectsList';

@Component({
  selector: 'app-portfolio-grid',
  templateUrl: './portfolio-grid.component.html',
  styleUrls: ['./portfolio-grid.component.scss']
})
export class PortfolioGridComponent implements OnInit {

  innerWidth: any;
  gridSize = {
    col: 4,
    rowHeight: '300px',
    gutterSize: '20px'
  }
  projectsList = projectsList;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();
  @HostListener('window:resize', ['$event'])
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
    this.projectChange.emit(project);
    setTimeout(() => {
      this.element.portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
    }, 1);
  }

  mobileGrid(width: number) {
    if (width <= 700) {
      this.gridSize = {
        col: 2,
        rowHeight: '200px',
        gutterSize: '10px'
      }
    } else if (width <= 900) {
      this.gridSize = {
        col: 3,
        rowHeight: '250px',
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

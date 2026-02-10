import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../shared/interfaces/IProject';
import { ElementByIdService } from '../../shared/services/element-by-id.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  standalone: false
})
export class PortfolioComponent implements OnInit {

  @Input() showProject = false;
  @Output() showProjectChange: EventEmitter<boolean> = new EventEmitter();
  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();
  constructor(private elementService: ElementByIdService) { }

  ngOnInit(): void {
  }

  setProject(event: IProject): void {
    this.project = event;
    this.showProject = true;
    setTimeout(() => {
      this.elementService.requestScroll('project-info', 'center center', 1.5);
    }, 850);
  }

  changeShowProject(): void {
    this.showProject = !this.showProject;
  }
}

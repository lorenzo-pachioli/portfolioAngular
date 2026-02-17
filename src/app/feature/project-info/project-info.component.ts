import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { IProject } from '../../shared/interfaces/IProject';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss'],
  standalone: false
})
export class ProjectInfoComponent implements OnInit {

  @Input() showProject = false;
  @Output() showProjectChange: EventEmitter<boolean> = new EventEmitter();
  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();

  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
  }

  back(): void {
    this.showProjectChange.emit(false);
    setTimeout(() => {
      this.projectChange.emit();
    }, 1200);
    this.element.portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

}

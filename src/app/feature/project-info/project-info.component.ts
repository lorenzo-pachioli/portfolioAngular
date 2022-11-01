import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ElementByIdService } from 'src/app/shared/services/element-by-id.service';
import { IProject } from '../../shared/interfaces/IProject';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();

  constructor(public element: ElementByIdService) { }

  ngOnInit(): void {
  }

  back(): void {
    this.projectChange.emit();
    this.element.portfolio.nativeElement.scrollIntoView({ behavior: "smooth" });
  }

}

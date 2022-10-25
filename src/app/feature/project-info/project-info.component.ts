import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IProject } from '../../shared/interfaces/IProject';

@Component({
  selector: 'app-project-info',
  templateUrl: './project-info.component.html',
  styleUrls: ['./project-info.component.scss']
})
export class ProjectInfoComponent implements OnInit {

  @Input() project!: IProject;
  @Output() projectChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  back(): void {
    this.projectChange.emit();
  }

}

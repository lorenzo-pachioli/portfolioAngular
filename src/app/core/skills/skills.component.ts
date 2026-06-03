import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { skillsList } from './skillsList';
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements OnInit {

  list = skillsList;
  constructor() { }

  ngOnInit(): void {
  }

}

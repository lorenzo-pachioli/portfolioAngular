import { Component, OnInit } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {

  tiles: Tile[] = [
    { text: 'One', cols: 2, rows: 1, color: 'lightblue' },
    { text: 'Two', cols: 1, rows: 2, color: 'lightgreen' },
    { text: 'Three', cols: 1, rows: 1, color: 'lightpink' },
    { text: 'Four', cols: 2, rows: 1, color: '#DDBDF1' },
    { text: 'Five', cols: 1, rows: 2, color: 'lightblue' },
    { text: 'Six', cols: 1, rows: 1, color: 'lightgreen' },
    { text: 'Seven', cols: 2, rows: 1, color: 'lightpink' },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}

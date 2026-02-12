import { Component, OnInit } from '@angular/core';
import { descriptions } from './aboutData';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss'],
  standalone: false
})
export class AboutMeComponent implements OnInit {

  info = 'actualidad';
  language;
  descriptions = descriptions;
  isDragging = false;
  draggingValue = 0;

  constructor(public translate: TranslateService) {
    this.language = this.translate;
  }

  ngOnInit(): void {
  }

  setInfo(currentInfo: string): void {
    this.info = currentInfo;
    if (!this.isDragging) {
      this.draggingValue = this.calculateSliderValue();
    }
  }

  setButtonColor(value: string): any {
    if (this.info === value) {
      return { 'color': 'var(--color5)', 'text-shadow': '0 0 0.5em var(--color5)' }
    }
    return { 'color': 'var(--color3)' }
  }

  private calculateSliderValue(): number {
    const index = this.descriptions.findIndex(d => d.keyValue === this.info);
    if (index === -1) return 0;
    return (index / (this.descriptions.length - 1)) * 100;
  }

  get sliderValue(): number {
    return this.isDragging ? this.draggingValue : this.calculateSliderValue();
  }

  onSliderChange(event: any): void {
    const value = parseInt(event.target.value, 10);
    this.draggingValue = value;

    const index = Math.round((value / 100) * (this.descriptions.length - 1));
    const item = this.descriptions[index];
    if (item && this.info !== item.keyValue) {
      this.setInfo(item.keyValue);
    }
  }

  onDragStart(): void {
    this.isDragging = true;
    this.draggingValue = this.calculateSliderValue();
  }

  onDragEnd(): void {
    this.isDragging = false;
    // Snap to the final discrete value
    this.draggingValue = this.calculateSliderValue();
  }

  isItemVisible(keyValue: string): boolean {
    const index = this.descriptions.findIndex(d => d.keyValue === keyValue);
    const selectedIndex = this.descriptions.findIndex(d => d.keyValue === this.info);

    // Filtered view is now universal: Show first, last, and selected
    return index === 0 || index === this.descriptions.length - 1 || index === selectedIndex;
  }
}

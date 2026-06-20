import { AfterViewInit, Component, ElementRef, HostListener, QueryList, ViewChildren } from '@angular/core';
import { skillCategories, SkillCategory } from './skillsList';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: false
})
export class SkillsComponent implements AfterViewInit {

  categories: SkillCategory[] = skillCategories;

  @ViewChildren('glassCard', { read: ElementRef })
  private glassCards!: QueryList<ElementRef<HTMLElement>>;

  ngAfterViewInit(): void {
    setTimeout(() => this.rebuildAllMasks(), 100);

    if (document.fonts) {
      document.fonts.ready.then(() => this.rebuildAllMasks());
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.rebuildAllMasks();
  }

  private rebuildAllMasks(): void {
    this.glassCards?.forEach(card => this.buildMaskForCard(card.nativeElement));
  }

  /**
   * Mide la posición y el tamaño real de cada .hole-tag dentro de la card
   * y arma un mask SVG (data URI) que recorta esa misma forma en .glass-pane.
   * Donde el mask es negro, el backdrop-filter no se renderiza: se ve el
   * fondo real de la página, sin blur, simulando un agujero en el vidrio.
   */
  private buildMaskForCard(card: HTMLElement): void {
    const pane = card.querySelector<HTMLElement>('.glass-pane');
    const tags = card.querySelectorAll<HTMLElement>('.hole-tag');
    if (!pane || !tags.length) {
      return;
    }

    const cardRect = card.getBoundingClientRect();
    const { width, height } = cardRect;
    if (!width || !height) {
      return;
    }

    const cutouts = Array.from(tags).map(tag => {
      const r = tag.getBoundingClientRect();
      const x = (r.left - cardRect.left).toFixed(2);
      const y = (r.top - cardRect.top).toFixed(2);
      const rx = (r.height / 2).toFixed(2);
      return `<rect x="${x}" y="${y}" width="${r.width.toFixed(2)}" height="${r.height.toFixed(2)}" rx="${rx}" fill="#000"/>`;
    }).join('');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">` +
      `<rect width="${width}" height="${height}" rx="18" fill="#fff"/>${cutouts}</svg>`;

    const maskUrl = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

    (pane.style as any).maskImage = maskUrl;
    (pane.style as any).webkitMaskImage = maskUrl;
  }
}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeComponent } from './about-me.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AboutMeComponent', () => {
  let component: AboutMeComponent;
  let fixture: ComponentFixture<AboutMeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutMeComponent],
      imports: [TranslateModule.forRoot()]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AboutMeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

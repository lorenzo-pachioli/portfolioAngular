import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSideNavComponent } from './social-side-nav.component';

describe('SocialSideNavComponent', () => {
  let component: SocialSideNavComponent;
  let fixture: ComponentFixture<SocialSideNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SocialSideNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocialSideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

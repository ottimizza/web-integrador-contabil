import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideCheckComponent } from './slide-check.component';

describe('SlideCheckComponent', () => {
  let component: SlideCheckComponent;
  let fixture: ComponentFixture<SlideCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlideCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

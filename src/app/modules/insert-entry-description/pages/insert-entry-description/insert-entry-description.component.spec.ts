import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertEntryDescriptionComponent } from './insert-entry-description.component';

describe('InsertEntryDescriptionComponent', () => {
  let component: InsertEntryDescriptionComponent;
  let fixture: ComponentFixture<InsertEntryDescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertEntryDescriptionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertEntryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

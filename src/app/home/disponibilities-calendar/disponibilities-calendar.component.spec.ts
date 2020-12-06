import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilitiesCalendarComponent } from './disponibilities-calendar.component';

describe('DisponibilitiesCalendarComponent', () => {
  let component: DisponibilitiesCalendarComponent;
  let fixture: ComponentFixture<DisponibilitiesCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibilitiesCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisponibilitiesCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

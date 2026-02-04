import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassworkTrainingPlanningComponent } from './edit-passwork-training-planning.component';

describe('EditPassworkTrainingPlanningComponent', () => {
  let component: EditPassworkTrainingPlanningComponent;
  let fixture: ComponentFixture<EditPassworkTrainingPlanningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPassworkTrainingPlanningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassworkTrainingPlanningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

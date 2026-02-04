import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungSkillsAssessmentComponent } from './edit-young-skills-assessment.component';

describe('EditYoungSkillsAssessmentComponent', () => {
  let component: EditYoungSkillsAssessmentComponent;
  let fixture: ComponentFixture<EditYoungSkillsAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungSkillsAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungSkillsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

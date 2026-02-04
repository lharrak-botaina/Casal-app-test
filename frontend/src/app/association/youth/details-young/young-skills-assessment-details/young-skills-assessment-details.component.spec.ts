import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungSkillsAssessmentDetailsComponent } from './young-skills-assessment-details.component';

describe('YoungSkillsAssessmentDetailsComponent', () => {
  let component: YoungSkillsAssessmentDetailsComponent;
  let fixture: ComponentFixture<YoungSkillsAssessmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungSkillsAssessmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungSkillsAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

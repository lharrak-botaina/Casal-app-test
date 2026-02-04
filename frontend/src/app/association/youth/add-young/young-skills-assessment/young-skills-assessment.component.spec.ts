import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungSkillsAssessmentComponent } from './young-skills-assessment.component';

describe('YoungSkillsAssessmentComponent', () => {
  let component: YoungSkillsAssessmentComponent;
  let fixture: ComponentFixture<YoungSkillsAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungSkillsAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungSkillsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

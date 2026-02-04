import { Component, Input, OnInit } from '@angular/core';
import { SkillsAssessment } from 'src/app/core/models/young';

@Component({
  selector: 'app-young-skills-assessment-details',
  templateUrl: './young-skills-assessment-details.component.html',
  styleUrls: ['./young-skills-assessment-details.component.scss']
})
export class YoungSkillsAssessmentDetailsComponent implements OnInit {
  @Input() skillsAssessment : SkillsAssessment;
  @Input() isCompany? : boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}

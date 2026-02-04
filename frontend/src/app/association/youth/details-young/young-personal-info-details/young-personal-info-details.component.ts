import { Component, Input, OnInit } from '@angular/core';
import { PersonalInfo } from 'src/app/core/models/young';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-young-personal-info-details',
  templateUrl: './young-personal-info-details.component.html',
  styleUrls: ['./young-personal-info-details.component.scss']
})
export class YoungPersonalInfoDetailsComponent implements OnInit {
  @Input() personalInfo : PersonalInfo;
  @Input() status : Boolean;
  @Input() isFull : Boolean = true;
  @Input() associationName : string = '';
  @Input() associationId : string = '';
  host = `${environment.host}youth/photos/`
  constructor() { }

  ngOnInit(): void {
  }

}

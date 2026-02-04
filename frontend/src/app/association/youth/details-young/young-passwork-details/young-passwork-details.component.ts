import { Component, Input, OnInit } from '@angular/core';
import { Passwork_Details, PassworkTraining } from 'src/app/core/models/young';

@Component({
    selector: 'app-young-passwork-details',
    templateUrl: './young-passwork-details.component.html',
    styleUrls: ['./young-passwork-details.component.scss'],
    standalone: false
})
export class YoungPassworkDetailsComponent implements OnInit {
  @Input() passwork : Passwork_Details;
  constructor() { }

  ngOnInit(): void {
  }

}

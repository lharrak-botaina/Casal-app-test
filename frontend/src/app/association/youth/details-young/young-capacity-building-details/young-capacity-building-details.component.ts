import { Component, Input, OnInit } from '@angular/core';
import { CapacityBuilding } from 'src/app/core/models/young';

@Component({
  selector: 'app-young-capacity-building-details',
  templateUrl: './young-capacity-building-details.component.html',
  styleUrls: ['./young-capacity-building-details.component.scss']
})
export class YoungCapacityBuildingDetailsComponent implements OnInit {
  @Input() capacityBuilding : CapacityBuilding;
  constructor() { }

  ngOnInit(): void {
  }

}

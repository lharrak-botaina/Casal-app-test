import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Association } from 'src/app/core/models/association';

@Component({
    selector: 'app-info-association',
    templateUrl: './info-association.component.html',
    styleUrls: ['./info-association.component.scss'],
    standalone: false
})
export class InfoAssociationComponent implements OnInit {
  @Input() association : Association;
  constructor() { }

  ngOnInit(): void {
  }

}

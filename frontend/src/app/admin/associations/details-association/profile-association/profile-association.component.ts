import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Association } from 'src/app/core/models/association';

@Component({
    selector: 'app-profile-association',
    templateUrl: './profile-association.component.html',
    styleUrls: ['./profile-association.component.scss'],
    standalone: false
})
export class ProfileAssociationComponent implements OnInit {
  @Input() association : Association;
  host = environment.ASSOCIATIONS_DOCS_HOST;
  constructor() { }

  ngOnInit(): void {
  }

}

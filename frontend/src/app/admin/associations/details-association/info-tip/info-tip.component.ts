import { environment } from 'src/environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { Association } from 'src/app/core/models/association';

@Component({
    selector: 'app-info-tip',
    templateUrl: './info-tip.component.html',
    styleUrls: ['./info-tip.component.scss'],
    standalone: false
})
export class InfoTipComponent implements OnInit {
  @Input() association : Association;
  host = environment.ASSOCIATIONS_DOCS_HOST;
  constructor() { }

  ngOnInit(): void {
  }

}

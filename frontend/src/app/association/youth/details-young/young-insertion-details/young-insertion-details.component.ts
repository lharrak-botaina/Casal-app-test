import { Component, Input, OnInit } from '@angular/core';
import { Insertion } from 'src/app/core/models/young';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-young-insertion-details',
  templateUrl: './young-insertion-details.component.html',
  styleUrls: ['./young-insertion-details.component.scss']
})
export class YoungInsertionDetailsComponent implements OnInit {
  @Input() insertions : Insertion
  host = environment.JUSTIFICATION_DOCS_HOST;

  constructor() { }

  ngOnInit(): void {
  }

}

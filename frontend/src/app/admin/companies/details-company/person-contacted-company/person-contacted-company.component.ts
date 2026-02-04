import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/core/models/company';

@Component({
  selector: 'app-person-contacted-company',
  templateUrl: './person-contacted-company.component.html',
  styleUrls: ['./person-contacted-company.component.scss']
})
export class PersonContactedCompanyComponent implements OnInit {
  @Input() company : Company;
  constructor() { }

  ngOnInit(): void {
  }

}

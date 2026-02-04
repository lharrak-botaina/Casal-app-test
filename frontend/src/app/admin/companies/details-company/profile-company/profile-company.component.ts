import { Component, Input, OnInit } from '@angular/core';
import { Company } from 'src/app/core/models/company';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit {
  @Input() company : Company;
  host = environment.COMPANY_LOGO_HOST;

  constructor() { }

  ngOnInit(): void {
  }

}

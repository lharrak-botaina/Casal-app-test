import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonContactedCompanyComponent } from './person-contacted-company.component';

describe('PersonContactedCompanyComponent', () => {
  let component: PersonContactedCompanyComponent;
  let fixture: ComponentFixture<PersonContactedCompanyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonContactedCompanyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonContactedCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyListJobComponent } from './company-list-job.component';

describe('CompanyListJobComponent', () => {
  let component: CompanyListJobComponent;
  let fixture: ComponentFixture<CompanyListJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyListJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyListJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

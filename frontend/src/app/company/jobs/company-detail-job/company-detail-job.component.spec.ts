import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailJobComponent } from './company-detail-job.component';

describe('CompanyDetailJobComponent', () => {
  let component: CompanyDetailJobComponent;
  let fixture: ComponentFixture<CompanyDetailJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyDetailJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyEditJobComponent } from './company-edit-job.component';

describe('CompanyEditJobComponent', () => {
  let component: CompanyEditJobComponent;
  let fixture: ComponentFixture<CompanyEditJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyEditJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyEditJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

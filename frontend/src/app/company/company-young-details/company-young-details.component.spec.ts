import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyYoungDetailsComponent } from './company-young-details.component';

describe('CompanyYoungDetailsComponent', () => {
  let component: CompanyYoungDetailsComponent;
  let fixture: ComponentFixture<CompanyYoungDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyYoungDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyYoungDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

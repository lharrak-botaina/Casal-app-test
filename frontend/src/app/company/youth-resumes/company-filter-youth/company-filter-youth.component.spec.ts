import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyFilterYouthComponent } from './company-filter-youth.component';

describe('CompanyFilterYouthComponent', () => {
  let component: CompanyFilterYouthComponent;
  let fixture: ComponentFixture<CompanyFilterYouthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyFilterYouthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyFilterYouthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

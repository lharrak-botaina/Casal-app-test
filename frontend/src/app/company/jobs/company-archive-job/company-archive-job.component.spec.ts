import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyArchiveJobComponent } from './company-archive-job.component';

describe('CompanyArchiveJobComponent', () => {
  let component: CompanyArchiveJobComponent;
  let fixture: ComponentFixture<CompanyArchiveJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyArchiveJobComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyArchiveJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

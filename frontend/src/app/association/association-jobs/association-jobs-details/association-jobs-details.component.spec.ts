import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationJobsDetailsComponent } from './association-jobs-details.component';

describe('AssociationJobsDetailsComponent', () => {
  let component: AssociationJobsDetailsComponent;
  let fixture: ComponentFixture<AssociationJobsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationJobsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationJobsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

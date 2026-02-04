import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationJobsComponent } from './association-jobs.component';

describe('AssociationJobsComponent', () => {
  let component: AssociationJobsComponent;
  let fixture: ComponentFixture<AssociationJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationJobsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

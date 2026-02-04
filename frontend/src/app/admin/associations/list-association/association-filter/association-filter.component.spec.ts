import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationFilterComponent } from './association-filter.component';

describe('AssociationFilterComponent', () => {
  let component: AssociationFilterComponent;
  let fixture: ComponentFixture<AssociationFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

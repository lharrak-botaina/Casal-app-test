import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationHomeComponent } from './association-home.component';

describe('AssociationHomeComponent', () => {
  let component: AssociationHomeComponent;
  let fixture: ComponentFixture<AssociationHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

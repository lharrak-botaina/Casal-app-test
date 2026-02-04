import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociationPasswordComponent } from './edit-association-password.component';

describe('EditAssociationPasswordComponent', () => {
  let component: EditAssociationPasswordComponent;
  let fixture: ComponentFixture<EditAssociationPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssociationPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociationPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

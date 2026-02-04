import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompanyPasswordComponent } from './edit-company-password.component';

describe('EditCompanyPasswordComponent', () => {
  let component: EditCompanyPasswordComponent;
  let fixture: ComponentFixture<EditCompanyPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCompanyPasswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCompanyPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungPersonalInfoComponent } from './edit-young-personal-info.component';

describe('EditYoungPersonalInfoComponent', () => {
  let component: EditYoungPersonalInfoComponent;
  let fixture: ComponentFixture<EditYoungPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

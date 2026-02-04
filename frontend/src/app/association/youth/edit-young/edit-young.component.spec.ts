import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungComponent } from './edit-young.component';

describe('EditYoungComponent', () => {
  let component: EditYoungComponent;
  let fixture: ComponentFixture<EditYoungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

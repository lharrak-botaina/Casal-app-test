import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungInsertionComponent } from './edit-young-insertion.component';

describe('EditYoungInsertionComponent', () => {
  let component: EditYoungInsertionComponent;
  let fixture: ComponentFixture<EditYoungInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

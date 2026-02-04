import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYoungInsertionComponent } from './add-young-insertion.component';

describe('AddYoungInsertionComponent', () => {
  let component: AddYoungInsertionComponent;
  let fixture: ComponentFixture<AddYoungInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddYoungInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddYoungInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

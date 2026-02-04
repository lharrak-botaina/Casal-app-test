import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungJustificationDialogComponent } from './edit-young-justification-dialog.component';

describe('EditYoungJustificationDialogComponent', () => {
  let component: EditYoungJustificationDialogComponent;
  let fixture: ComponentFixture<EditYoungJustificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungJustificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungJustificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

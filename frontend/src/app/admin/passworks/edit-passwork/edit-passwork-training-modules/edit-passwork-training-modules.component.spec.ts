import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassworkTrainingModulesComponent } from './edit-passwork-training-modules.component';

describe('EditPassworkTrainingModulesComponent', () => {
  let component: EditPassworkTrainingModulesComponent;
  let fixture: ComponentFixture<EditPassworkTrainingModulesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPassworkTrainingModulesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassworkTrainingModulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

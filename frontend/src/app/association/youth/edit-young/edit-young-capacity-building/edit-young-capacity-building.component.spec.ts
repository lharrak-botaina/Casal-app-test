import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungCapacityBuildingComponent } from './edit-young-capacity-building.component';

describe('EditYoungCapacityBuildingComponent', () => {
  let component: EditYoungCapacityBuildingComponent;
  let fixture: ComponentFixture<EditYoungCapacityBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungCapacityBuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungCapacityBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

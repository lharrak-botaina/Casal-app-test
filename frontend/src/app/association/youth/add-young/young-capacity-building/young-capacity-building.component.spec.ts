import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungCapacityBuildingComponent } from './young-capacity-building.component';

describe('YoungCapacityBuildingComponent', () => {
  let component: YoungCapacityBuildingComponent;
  let fixture: ComponentFixture<YoungCapacityBuildingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungCapacityBuildingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungCapacityBuildingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

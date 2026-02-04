import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungCapacityBuildingDetailsComponent } from './young-capacity-building-details.component';

describe('YoungCapacityBuildingDetailsComponent', () => {
  let component: YoungCapacityBuildingDetailsComponent;
  let fixture: ComponentFixture<YoungCapacityBuildingDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungCapacityBuildingDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungCapacityBuildingDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

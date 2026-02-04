import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYoungPassworkComponent } from './edit-young-passwork.component';

describe('EditYoungPassworkComponent', () => {
  let component: EditYoungPassworkComponent;
  let fixture: ComponentFixture<EditYoungPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditYoungPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditYoungPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

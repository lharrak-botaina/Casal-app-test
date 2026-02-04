import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPassworkComponent } from './edit-passwork.component';

describe('EditPassworkComponent', () => {
  let component: EditPassworkComponent;
  let fixture: ComponentFixture<EditPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

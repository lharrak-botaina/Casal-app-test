import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPassworkComponent } from './add-passwork.component';

describe('AddPassworkComponent', () => {
  let component: AddPassworkComponent;
  let fixture: ComponentFixture<AddPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

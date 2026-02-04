import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassworkFilterComponent } from './passwork-filter.component';

describe('PassworkFilterComponent', () => {
  let component: PassworkFilterComponent;
  let fixture: ComponentFixture<PassworkFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PassworkFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassworkFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

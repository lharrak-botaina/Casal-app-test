import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYoungComponent } from './list-young.component';

describe('ListYoungComponent', () => {
  let component: ListYoungComponent;
  let fixture: ComponentFixture<ListYoungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYoungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

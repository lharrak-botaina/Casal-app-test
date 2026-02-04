import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungFilterComponent } from './young-filter.component';

describe('YoungFilterComponent', () => {
  let component: YoungFilterComponent;
  let fixture: ComponentFixture<YoungFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

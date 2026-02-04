import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungInsertionComponent } from './young-insertion.component';

describe('YoungInsertionComponent', () => {
  let component: YoungInsertionComponent;
  let fixture: ComponentFixture<YoungInsertionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungInsertionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungInsertionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

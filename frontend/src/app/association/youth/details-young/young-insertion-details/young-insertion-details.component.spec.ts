import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungInsertionDetailsComponent } from './young-insertion-details.component';

describe('YoungInsertionDetailsComponent', () => {
  let component: YoungInsertionDetailsComponent;
  let fixture: ComponentFixture<YoungInsertionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungInsertionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungInsertionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

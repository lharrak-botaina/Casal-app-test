import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungCardComponent } from './young-card.component';

describe('YoungCardComponent', () => {
  let component: YoungCardComponent;
  let fixture: ComponentFixture<YoungCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

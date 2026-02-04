import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungPassworkDetailsComponent } from './young-passwork-details.component';

describe('YoungPassworkDetailsComponent', () => {
  let component: YoungPassworkDetailsComponent;
  let fixture: ComponentFixture<YoungPassworkDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungPassworkDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungPassworkDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

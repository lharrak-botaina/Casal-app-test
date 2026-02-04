import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintCenterComponent } from './print-center.component';

describe('PrintCenterComponent', () => {
  let component: PrintCenterComponent;
  let fixture: ComponentFixture<PrintCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

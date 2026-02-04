import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTipComponent } from './info-tip.component';

describe('InfoTipComponent', () => {
  let component: InfoTipComponent;
  let fixture: ComponentFixture<InfoTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTipComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

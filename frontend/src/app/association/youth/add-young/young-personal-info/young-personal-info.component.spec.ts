import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungPersonalInfoComponent } from './young-personal-info.component';

describe('YoungPersonalInfoComponent', () => {
  let component: YoungPersonalInfoComponent;
  let fixture: ComponentFixture<YoungPersonalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungPersonalInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungPersonalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

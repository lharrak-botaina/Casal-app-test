import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungPersonalInfoDetailsComponent } from './young-personal-info-details.component';

describe('YoungPersonalInfoDetailsComponent', () => {
  let component: YoungPersonalInfoDetailsComponent;
  let fixture: ComponentFixture<YoungPersonalInfoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungPersonalInfoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungPersonalInfoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

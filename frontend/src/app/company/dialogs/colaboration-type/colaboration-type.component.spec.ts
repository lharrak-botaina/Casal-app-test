import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaborationTypeComponent } from './colaboration-type.component';

describe('ColaborationTypeComponent', () => {
  let component: ColaborationTypeComponent;
  let fixture: ComponentFixture<ColaborationTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColaborationTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColaborationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

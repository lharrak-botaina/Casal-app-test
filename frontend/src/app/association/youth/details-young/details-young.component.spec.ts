import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsYoungComponent } from './details-young.component';

describe('DetailsYoungComponent', () => {
  let component: DetailsYoungComponent;
  let fixture: ComponentFixture<DetailsYoungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsYoungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsYoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

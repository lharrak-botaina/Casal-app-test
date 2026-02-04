import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPassworkComponent } from './details-passwork.component';

describe('DetailsPassworkComponent', () => {
  let component: DetailsPassworkComponent;
  let fixture: ComponentFixture<DetailsPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

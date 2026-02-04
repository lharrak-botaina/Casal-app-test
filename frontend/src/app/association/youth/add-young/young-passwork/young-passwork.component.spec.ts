import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungPassworkComponent } from './young-passwork.component';

describe('YoungPassworkComponent', () => {
  let component: YoungPassworkComponent;
  let fixture: ComponentFixture<YoungPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

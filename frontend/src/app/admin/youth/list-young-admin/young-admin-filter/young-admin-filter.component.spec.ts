import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YoungAdminFilterComponent } from './young-admin-filter.component';

describe('YoungAdminFilterComponent', () => {
  let component: YoungAdminFilterComponent;
  let fixture: ComponentFixture<YoungAdminFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YoungAdminFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YoungAdminFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListYoungAdminComponent } from './list-young-admin.component';

describe('ListYoungAdminComponent', () => {
  let component: ListYoungAdminComponent;
  let fixture: ComponentFixture<ListYoungAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListYoungAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListYoungAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

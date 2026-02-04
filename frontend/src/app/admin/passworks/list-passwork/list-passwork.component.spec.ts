import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPassworkComponent } from './list-passwork.component';

describe('ListPassworkComponent', () => {
  let component: ListPassworkComponent;
  let fixture: ComponentFixture<ListPassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

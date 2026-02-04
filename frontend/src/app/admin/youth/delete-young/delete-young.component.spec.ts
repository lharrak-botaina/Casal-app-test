import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteYoungComponent } from './delete-young.component';

describe('DeleteYoungComponent', () => {
  let component: DeleteYoungComponent;
  let fixture: ComponentFixture<DeleteYoungComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteYoungComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteYoungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

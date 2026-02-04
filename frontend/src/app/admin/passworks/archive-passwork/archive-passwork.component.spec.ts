import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivePassworkComponent } from './archive-passwork.component';

describe('ArchivePassworkComponent', () => {
  let component: ArchivePassworkComponent;
  let fixture: ComponentFixture<ArchivePassworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivePassworkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivePassworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAssociationPhotosComponent } from './edit-association-photos.component';

describe('EditAssociationPhotosComponent', () => {
  let component: EditAssociationPhotosComponent;
  let fixture: ComponentFixture<EditAssociationPhotosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAssociationPhotosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAssociationPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

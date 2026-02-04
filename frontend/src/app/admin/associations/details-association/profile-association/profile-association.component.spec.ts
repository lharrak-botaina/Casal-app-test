import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileAssociationComponent } from './profile-association.component';

describe('ProfileAssociationComponent', () => {
  let component: ProfileAssociationComponent;
  let fixture: ComponentFixture<ProfileAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

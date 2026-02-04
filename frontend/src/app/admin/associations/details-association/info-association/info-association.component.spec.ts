import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAssociationComponent } from './info-association.component';

describe('InfoAssociationComponent', () => {
  let component: InfoAssociationComponent;
  let fixture: ComponentFixture<InfoAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

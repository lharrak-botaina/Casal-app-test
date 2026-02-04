import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAssociationComponent } from './details-association.component';

describe('DetailsAssociationComponent', () => {
  let component: DetailsAssociationComponent;
  let fixture: ComponentFixture<DetailsAssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsAssociationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

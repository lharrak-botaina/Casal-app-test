import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YouthResumesComponent } from './youth-resumes.component';

describe('YouthResumesComponent', () => {
  let component: YouthResumesComponent;
  let fixture: ComponentFixture<YouthResumesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YouthResumesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YouthResumesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

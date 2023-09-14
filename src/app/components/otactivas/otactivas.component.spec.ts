import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OTActivasComponent } from './otactivas.component';

describe('OTActivasComponent', () => {
  let component: OTActivasComponent;
  let fixture: ComponentFixture<OTActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OTActivasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OTActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

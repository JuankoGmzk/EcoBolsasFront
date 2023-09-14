import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisOTComponent } from './mis-ot.component';

describe('MisOTComponent', () => {
  let component: MisOTComponent;
  let fixture: ComponentFixture<MisOTComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MisOTComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MisOTComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

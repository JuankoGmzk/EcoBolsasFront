import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivateTaskComponent } from './private-task.component';

describe('PrivateTaskComponent', () => {
  let component: PrivateTaskComponent;
  let fixture: ComponentFixture<PrivateTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivateTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

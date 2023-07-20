import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotwComponent } from './totw.component';

describe('TotwComponent', () => {
  let component: TotwComponent;
  let fixture: ComponentFixture<TotwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TotwComponent]
    });
    fixture = TestBed.createComponent(TotwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDash2Component } from './admin-dash2.component';

describe('AdminDash2Component', () => {
  let component: AdminDash2Component;
  let fixture: ComponentFixture<AdminDash2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminDash2Component]
    });
    fixture = TestBed.createComponent(AdminDash2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

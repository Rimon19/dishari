import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCellRequestComponent } from './admin-cell-request.component';

describe('AdminCellRequestComponent', () => {
  let component: AdminCellRequestComponent;
  let fixture: ComponentFixture<AdminCellRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCellRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCellRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

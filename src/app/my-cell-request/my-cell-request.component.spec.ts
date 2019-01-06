import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCellRequestComponent } from './my-cell-request.component';

describe('MyCellRequestComponent', () => {
  let component: MyCellRequestComponent;
  let fixture: ComponentFixture<MyCellRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCellRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCellRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

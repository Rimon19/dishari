import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSuccessFreeBooksComponent } from './order-success-free-books.component';

describe('OrderSuccessFreeBooksComponent', () => {
  let component: OrderSuccessFreeBooksComponent;
  let fixture: ComponentFixture<OrderSuccessFreeBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSuccessFreeBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSuccessFreeBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

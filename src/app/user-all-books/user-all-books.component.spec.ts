import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAllBooksComponent } from './user-all-books.component';

describe('UserAllBooksComponent', () => {
  let component: UserAllBooksComponent;
  let fixture: ComponentFixture<UserAllBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAllBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAllBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

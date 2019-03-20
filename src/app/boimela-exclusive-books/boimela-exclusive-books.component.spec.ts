import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoimelaExclusiveBooksComponent } from './boimela-exclusive-books.component';

describe('BoimelaExclusiveBooksComponent', () => {
  let component: BoimelaExclusiveBooksComponent;
  let fixture: ComponentFixture<BoimelaExclusiveBooksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoimelaExclusiveBooksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoimelaExclusiveBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

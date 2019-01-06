import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosTestingPurposeComponent } from './todos-testing-purpose.component';

describe('TodosTestingPurposeComponent', () => {
  let component: TodosTestingPurposeComponent;
  let fixture: ComponentFixture<TodosTestingPurposeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodosTestingPurposeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodosTestingPurposeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

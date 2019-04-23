import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarchandDashboardComponent } from './marchand-dashboard.component';

describe('MarchandDashboardComponent', () => {
  let component: MarchandDashboardComponent;
  let fixture: ComponentFixture<MarchandDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarchandDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarchandDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPdfFilesComponent } from './view-pdf-files.component';

describe('ViewPdfFilesComponent', () => {
  let component: ViewPdfFilesComponent;
  let fixture: ComponentFixture<ViewPdfFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPdfFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPdfFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

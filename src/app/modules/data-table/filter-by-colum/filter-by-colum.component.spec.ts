import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterByColumComponent } from './filter-by-colum.component';

describe('FilterByColumComponent', () => {
  let component: FilterByColumComponent;
  let fixture: ComponentFixture<FilterByColumComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterByColumComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterByColumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

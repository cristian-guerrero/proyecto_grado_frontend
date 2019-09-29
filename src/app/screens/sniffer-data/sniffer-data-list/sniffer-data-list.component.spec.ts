import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnifferDataListComponent } from './sniffer-data-list.component';

describe('SnifferDataListComponent', () => {
  let component: SnifferDataListComponent;
  let fixture: ComponentFixture<SnifferDataListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnifferDataListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnifferDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

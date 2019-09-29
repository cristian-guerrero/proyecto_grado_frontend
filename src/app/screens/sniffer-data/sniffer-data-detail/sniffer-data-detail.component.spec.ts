import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnifferDataDetailComponent } from './sniffer-data-detail.component';

describe('SnifferDataDetailComponent', () => {
  let component: SnifferDataDetailComponent;
  let fixture: ComponentFixture<SnifferDataDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnifferDataDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnifferDataDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

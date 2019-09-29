import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnifferTokenFormComponent } from './sniffer-token-form.component';

describe('SnifferTokenFormComponent', () => {
  let component: SnifferTokenFormComponent;
  let fixture: ComponentFixture<SnifferTokenFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnifferTokenFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnifferTokenFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

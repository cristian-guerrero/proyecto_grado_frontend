import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnifferFormComponent } from './sniffer-form.component';

describe('SnifferFormComponent', () => {
  let component: SnifferFormComponent;
  let fixture: ComponentFixture<SnifferFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnifferFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnifferFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

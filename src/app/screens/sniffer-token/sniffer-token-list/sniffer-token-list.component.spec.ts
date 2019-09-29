import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnifferTokenListComponent } from './sniffer-token-list.component';

describe('SnifferTokenListComponent', () => {
  let component: SnifferTokenListComponent;
  let fixture: ComponentFixture<SnifferTokenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnifferTokenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnifferTokenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

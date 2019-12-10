import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SniffersListComponent } from './sniffers-list.component';

describe('SniffersListComponent', () => {
  let component: SniffersListComponent;
  let fixture: ComponentFixture<SniffersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SniffersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SniffersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

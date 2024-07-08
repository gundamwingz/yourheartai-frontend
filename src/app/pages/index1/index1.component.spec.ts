import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Index1Component } from './index1.component';

describe('Index1Component', () => {
  let component: Index1Component;
  let fixture: ComponentFixture<Index1Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Index1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Index1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
